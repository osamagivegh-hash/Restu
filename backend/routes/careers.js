const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Career = require('../models/Career');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `cv-${uniqueSuffix}${extension}`);
  }
});

// File filter for CV uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed for CV uploads'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Only one file per request
  }
});

// Validation middleware
const careerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  body('position')
    .isIn(['Head Chef', 'Sous Chef', 'Server', 'Host/Hostess', 'Kitchen Assistant', 'Manager'])
    .withMessage('Please select a valid position'),
  body('experience')
    .isIn(['0-1 years', '2-3 years', '4-5 years', '6-10 years', '10+ years'])
    .withMessage('Please select a valid experience level'),
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Cover letter cannot exceed 2000 characters')
];

// POST /api/careers - Submit job application
router.post('/', upload.single('cv'), careerValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if CV file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'CV file is required'
      });
    }

    const { firstName, lastName, email, phone, position, experience, coverLetter } = req.body;

    // Create new career application
    const career = new Career({
      firstName,
      lastName,
      email,
      phone,
      position,
      experience,
      coverLetter: coverLetter || '',
      cvPath: req.file.path,
      cvOriginalName: req.file.originalname,
      cvSize: req.file.size,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown'
    });

    await career.save();

    // TODO: Send email notification to HR
    // await sendApplicationNotification(career);

    res.status(201).json({
      success: true,
      message: 'Thank you for your application! We will review it and get back to you soon.',
      data: {
        id: career._id,
        fullName: career.fullName,
        email: career.email,
        position: career.position,
        submittedAt: career.formattedDate
      }
    });

  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }

    console.error('Career application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/careers - Get all job applications (Admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, position } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (position) filter.position = position;

    const careers = await Career.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-ipAddress -userAgent -cvPath');

    const total = await Career.countDocuments(filter);

    res.json({
      success: true,
      data: {
        careers,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalApplications: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get careers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/careers/:id - Get specific job application
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id)
      .select('-ipAddress -userAgent');

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: career
    });

  } catch (error) {
    console.error('Get career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve application',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/careers/:id/cv - Download CV file
router.get('/:id/cv', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if file exists
    if (!fs.existsSync(career.cvPath)) {
      return res.status(404).json({
        success: false,
        message: 'CV file not found'
      });
    }

    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${career.cvOriginalName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file
    const fileStream = fs.createReadStream(career.cvPath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download CV error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download CV',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PATCH /api/careers/:id - Update application status (Admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;

    const career = await Career.findByIdAndUpdate(
      req.params.id,
      { 
        status: status || 'reviewing',
        ...(notes && { notes })
      },
      { new: true, runValidators: true }
    ).select('-ipAddress -userAgent -cvPath');

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: career
    });

  } catch (error) {
    console.error('Update career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE /api/careers/:id - Delete application (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Delete the CV file
    if (fs.existsSync(career.cvPath)) {
      fs.unlinkSync(career.cvPath);
    }

    // Delete the database record
    await Career.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    console.error('Delete career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

