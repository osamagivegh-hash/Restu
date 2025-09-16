const express = require('express');
const Contact = require('../models/Contact');
const Career = require('../models/Career');
const router = express.Router();

// Simple admin authentication middleware (in production, use proper JWT auth)
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === 'Bearer admin-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// GET /api/admin/dashboard - Get dashboard statistics
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const [
      totalContacts,
      totalApplications,
      recentContacts,
      recentApplications
    ] = await Promise.all([
      Contact.countDocuments(),
      Career.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('-ipAddress -userAgent'),
      Career.find().sort({ createdAt: -1 }).limit(5).select('-ipAddress -userAgent -cvPath')
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalContacts,
          totalApplications,
          totalMenuItems: 6, // Static for now
          totalBookings: 0 // Will implement booking system
        },
        recentContacts,
        recentApplications
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/admin/contacts - Get all contacts with pagination
router.get('/contacts', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

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

// GET /api/admin/applications - Get all applications with pagination
router.get('/applications', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, position, search } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (position) filter.position = position;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Career.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-ipAddress -userAgent -cvPath');

    const total = await Career.countDocuments(filter);

    res.json({
      success: true,
      data: {
        applications,
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
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/admin/menu - Get menu items (placeholder for future implementation)
router.get('/menu', authenticateAdmin, async (req, res) => {
  try {
    // For now, return static menu data
    // In production, this would fetch from a Menu model
    const menuItems = [
      {
        _id: '1',
        name: 'Peking Duck',
        description: 'Traditional Beijing-style roasted duck with crispy skin',
        price: '$45',
        category: 'Signature',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        prepTime: '45 min',
        rating: 4.9,
        isAvailable: true
      }
      // Add more items as needed
    ];

    res.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve menu items',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/admin/menu - Add new menu item (placeholder)
router.post('/menu', authenticateAdmin, async (req, res) => {
  try {
    // In production, this would save to a Menu model
    const menuItem = req.body;
    
    res.json({
      success: true,
      message: 'Menu item added successfully',
      data: { ...menuItem, _id: Date.now().toString() }
    });
  } catch (error) {
    console.error('Add menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add menu item',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/admin/bookings - Get bookings (placeholder for future implementation)
router.get('/bookings', authenticateAdmin, async (req, res) => {
  try {
    // For now, return empty array
    // In production, this would fetch from a Booking model
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

