const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Meal = require('../models/Meal');
const router = express.Router();

// إعداد multer لرفع الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/meals');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'meal-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مدعوم. يرجى رفع صورة فقط.'));
    }
  }
});

// التحقق من صحة البيانات
const mealValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم الوجبة يجب أن يكون بين 2 و 100 حرف'),
  body('nameEn')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('اسم الوجبة بالإنجليزية يجب أن يكون بين 2 و 100 حرف'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('وصف الوجبة يجب أن يكون بين 10 و 500 حرف'),
  body('descriptionEn')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('وصف الوجبة بالإنجليزية يجب أن يكون بين 10 و 500 حرف'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('السعر يجب أن يكون رقم موجب'),
  body('category')
    .isIn(['appetizers', 'main-courses', 'desserts', 'beverages', 'specials'])
    .withMessage('فئة الوجبة غير صحيحة'),
  body('categoryAr')
    .isIn(['مقبلات', 'أطباق رئيسية', 'حلويات', 'مشروبات', 'أطباق خاصة'])
    .withMessage('فئة الوجبة بالعربية غير صحيحة')
];

// إضافة وجبة جديدة
router.post('/', upload.single('image'), mealValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const {
      name,
      nameEn,
      description,
      descriptionEn,
      price,
      category,
      categoryAr,
      imageUrl,
      ingredients,
      allergens,
      preparationTime,
      isFeatured
    } = req.body;

    let uploadedImagePath = null;
    if (req.file) {
      uploadedImagePath = `/uploads/meals/${req.file.filename}`;
    }

    const newMeal = new Meal({
      name,
      nameEn,
      description,
      descriptionEn,
      price: parseFloat(price),
      category,
      categoryAr,
      imageUrl: uploadedImagePath || imageUrl,
      uploadedImage: uploadedImagePath,
      ingredients: ingredients ? ingredients.split(',').map(ing => ing.trim()) : [],
      allergens: allergens ? allergens.split(',').map(all => all.trim()) : [],
      preparationTime: preparationTime ? parseInt(preparationTime) : 15,
      isFeatured: isFeatured === 'true'
    });

    await newMeal.save();

    res.status(201).json({
      success: true,
      message: 'تم إضافة الوجبة بنجاح',
      data: newMeal
    });

  } catch (error) {
    console.error('خطأ في إضافة الوجبة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على جميع الوجبات
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, category, featured, search } = req.query;
    let filter = { isAvailable: true };

    if (category) {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameEn: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const meals = await Meal.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Meal.countDocuments(filter);

    res.json({
      success: true,
      data: {
        meals,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('خطأ في جلب الوجبات:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على وجبة واحدة
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'الوجبة غير موجودة'
      });
    }

    res.json({
      success: true,
      data: meal
    });

  } catch (error) {
    console.error('خطأ في جلب الوجبة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// تحديث وجبة
router.put('/:id', upload.single('image'), mealValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const {
      name,
      nameEn,
      description,
      descriptionEn,
      price,
      category,
      categoryAr,
      imageUrl,
      ingredients,
      allergens,
      preparationTime,
      isFeatured,
      isAvailable
    } = req.body;

    let uploadedImagePath = null;
    if (req.file) {
      uploadedImagePath = `/uploads/meals/${req.file.filename}`;
    }

    const updateData = {
      name,
      nameEn,
      description,
      descriptionEn,
      price: parseFloat(price),
      category,
      categoryAr,
      ingredients: ingredients ? ingredients.split(',').map(ing => ing.trim()) : [],
      allergens: allergens ? allergens.split(',').map(all => all.trim()) : [],
      preparationTime: preparationTime ? parseInt(preparationTime) : 15,
      isFeatured: isFeatured === 'true',
      isAvailable: isAvailable !== 'false'
    };

    if (uploadedImagePath) {
      updateData.imageUrl = uploadedImagePath;
      updateData.uploadedImage = uploadedImagePath;
    } else if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'الوجبة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الوجبة بنجاح',
      data: meal
    });

  } catch (error) {
    console.error('خطأ في تحديث الوجبة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// حذف وجبة
router.delete('/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'الوجبة غير موجودة'
      });
    }

    // حذف الصورة المرفوعة إذا كانت موجودة
    if (meal.uploadedImage) {
      const imagePath = path.join(__dirname, '..', meal.uploadedImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({
      success: true,
      message: 'تم حذف الوجبة بنجاح'
    });

  } catch (error) {
    console.error('خطأ في حذف الوجبة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على الوجبات المميزة
router.get('/featured/list', async (req, res) => {
  try {
    const meals = await Meal.find({
      isFeatured: true,
      isAvailable: true
    }).sort({ createdAt: -1 }).limit(6);

    res.json({
      success: true,
      data: meals
    });

  } catch (error) {
    console.error('خطأ في جلب الوجبات المميزة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على الوجبات حسب الفئة
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const meals = await Meal.find({
      category,
      isAvailable: true
    })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Meal.countDocuments({
      category,
      isAvailable: true
    });

    res.json({
      success: true,
      data: {
        meals,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('خطأ في جلب الوجبات حسب الفئة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

module.exports = router;
