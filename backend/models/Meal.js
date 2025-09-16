const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  nameEn: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  descriptionEn: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizers', 'main-courses', 'desserts', 'beverages', 'specials']
  },
  categoryAr: {
    type: String,
    required: true,
    enum: ['مقبلات', 'أطباق رئيسية', 'حلويات', 'مشروبات', 'أطباق خاصة']
  },
  imageUrl: {
    type: String,
    required: true
  },
  uploadedImage: {
    type: String // مسار الصورة المرفوعة من الجهاز
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true
  }],
  preparationTime: {
    type: Number, // بالدقائق
    default: 15
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// تحديث updatedAt عند التعديل
mealSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Meal', mealSchema);
