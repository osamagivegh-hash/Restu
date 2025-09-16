const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import routes
const contactRoutes = require('./routes/contact');
const careersRoutes = require('./routes/careers');
const adminRoutes = require('./routes/admin');
const commentsRoutes = require('./routes/comments');
const adsRoutes = require('./routes/ads');
const mealsRoutes = require('./routes/meals');

const app = express();
const PORT = process.env.PORT || 10000;

// Security middleware
app.use(helmet());

// Rate limiting (excluding health check)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 1000 : 100, // Higher limit for production
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => req.path === '/api/health' // Skip rate limiting for health checks
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3002', // Admin panel
  'http://localhost:3000', // Main frontend
  'http://localhost:3001', // Alternative frontend port
  'https://oriental-restaurant-frontend.onrender.com', // Production frontend
  'https://oriental-restaurant-admin.onrender.com'     // Production admin panel
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploaded CVs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint (should be first)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/meals', mealsRoutes);

// Debug: Log registered routes
console.log('Registered routes:');
console.log('- /api/health (GET)');
console.log('- /api/contact/*');
console.log('- /api/careers/*');
console.log('- /api/admin/*');
console.log('- /api/comments/*');
console.log('- /api/ads/*');
console.log('- /api/meals/*');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oriental-restaurant')
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
