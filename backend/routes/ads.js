const express = require('express');
const { body, validationResult } = require('express-validator');
const Ad = require('../models/Ad');
const router = express.Router();

// التحقق من صحة البيانات
const adValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('العنوان يجب أن يكون بين 2 و 100 حرف'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('الوصف يجب أن يكون بين 10 و 500 حرف'),
  body('imageUrl')
    .isURL()
    .withMessage('يرجى إدخال رابط صورة صحيح'),
  body('position')
    .isIn(['hero', 'menu', 'footer', 'sidebar'])
    .withMessage('موضع الإعلان غير صحيح')
];

// إضافة إعلان جديد
router.post('/', adValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const { title, description, imageUrl, link, position, startDate, endDate } = req.body;

    const newAd = new Ad({
      title,
      description,
      imageUrl,
      link,
      position,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null
    });

    await newAd.save();

    res.status(201).json({
      success: true,
      message: 'تم إضافة الإعلان بنجاح',
      data: newAd
    });

  } catch (error) {
    console.error('خطأ في إضافة الإعلان:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على الإعلانات النشطة
router.get('/active', async (req, res) => {
  try {
    const { position } = req.query;
    const now = new Date();
    
    let filter = {
      isActive: true,
      startDate: { $lte: now }
    };

    if (position) {
      filter.position = position;
    }

    // إضافة شرط انتهاء الصلاحية إذا كان محدد
    filter.$or = [
      { endDate: null },
      { endDate: { $gte: now } }
    ];

    const ads = await Ad.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: ads
    });

  } catch (error) {
    console.error('خطأ في جلب الإعلانات:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على جميع الإعلانات (للوحة الإدارة)
router.get('/admin', async (req, res) => {
  try {
    const { page = 1, limit = 10, position, isActive } = req.query;
    let filter = {};

    if (position) {
      filter.position = position;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const ads = await Ad.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Ad.countDocuments(filter);

    res.json({
      success: true,
      data: {
        ads,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('خطأ في جلب الإعلانات:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على إعلان واحد
router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    res.json({
      success: true,
      data: ad
    });

  } catch (error) {
    console.error('خطأ في جلب الإعلان:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// تحديث إعلان
router.put('/:id', adValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const { title, description, imageUrl, link, position, isActive, startDate, endDate } = req.body;

    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        imageUrl,
        link,
        position,
        isActive,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined
      },
      { new: true }
    );

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الإعلان بنجاح',
      data: ad
    });

  } catch (error) {
    console.error('خطأ في تحديث الإعلان:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// تفعيل/إلغاء تفعيل إعلان
router.patch('/:id/toggle', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    ad.isActive = !ad.isActive;
    await ad.save();

    res.json({
      success: true,
      message: ad.isActive ? 'تم تفعيل الإعلان' : 'تم إلغاء تفعيل الإعلان',
      data: ad
    });

  } catch (error) {
    console.error('خطأ في تغيير حالة الإعلان:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// تسجيل مشاهدة إعلان
router.post('/:id/view', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }
    );

    res.json({
      success: true,
      message: 'تم تسجيل المشاهدة'
    });

  } catch (error) {
    console.error('خطأ في تسجيل المشاهدة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// تسجيل نقرة على إعلان
router.post('/:id/click', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } }
    );

    res.json({
      success: true,
      message: 'تم تسجيل النقرة'
    });

  } catch (error) {
    console.error('خطأ في تسجيل النقرة:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// حذف إعلان
router.delete('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الإعلان بنجاح'
    });

  } catch (error) {
    console.error('خطأ في حذف الإعلان:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

module.exports = router;
