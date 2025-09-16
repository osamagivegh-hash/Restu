const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),
  body('subject')
    .isIn(['Reservation', 'Catering', 'Feedback', 'Complaint', 'General', 'Other'])
    .withMessage('Please select a valid subject'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown'
    });

    await contact.save();

    // TODO: Send email notification to restaurant
    // await sendContactNotification(contact);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        submittedAt: contact.formattedDate
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/contact - Get all contact submissions (Admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, subject } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (subject) filter.subject = subject;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-ipAddress -userAgent');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/contact/:id - Get specific contact submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .select('-ipAddress -userAgent');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PATCH /api/contact/:id - Update contact status (Admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status: status || 'in-progress',
        ...(notes && { notes })
      },
      { new: true, runValidators: true }
    ).select('-ipAddress -userAgent');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

