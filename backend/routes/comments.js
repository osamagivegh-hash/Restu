const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Meal = require('../models/Meal');
const router = express.Router();

// التحقق من صحة البيانات
const commentValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('الاسم يجب أن يكون بين 2 و 100 حرف'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('يرجى إدخال بريد إلكتروني صحيح'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('التقييم يجب أن يكون بين 1 و 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('التعليق يجب أن يكون بين 10 و 500 حرف'),
  body('mealId')
    .notEmpty()
    .withMessage('معرف الوجبة مطلوب')
];

// إضافة تعليق جديد
router.post('/', commentValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const { name, email, rating, comment, mealId, mealName } = req.body;

    // التحقق من وجود الوجبة
    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'الوجبة غير موجودة'
      });
    }

    // إنشاء التعليق
    const newComment = new Comment({
      name,
      email,
      rating,
      comment,
      mealId,
      mealName: mealName || meal.name
    });

    await newComment.save();

    // تحديث متوسط التقييم للوجبة
    await updateMealRating(mealId);

    res.status(201).json({
      success: true,
      message: 'تم إرسال التعليق بنجاح. سيتم مراجعته قبل النشر.',
      data: newComment
    });

  } catch (error) {
    console.error('خطأ في إضافة التعليق:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على التعليقات المعتمدة لوجبة معينة
router.get('/meal/:mealId', async (req, res) => {
  try {
    const { mealId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.find({
      mealId,
      isApproved: true
    })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Comment.countDocuments({
      mealId,
      isApproved: true
    });

    res.json({
      success: true,
      data: {
        comments,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('خطأ في جلب التعليقات:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الحصول على جميع التعليقات (للوحة الإدارة)
router.get('/admin', async (req, res) => {
  try {
    const { page = 1, limit = 10, approved } = req.query;
    let filter = {};

    if (approved !== undefined) {
      filter.isApproved = approved === 'true';
    }

    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Comment.countDocuments(filter);

    res.json({
      success: true,
      data: {
        comments,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('خطأ في جلب التعليقات:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// الموافقة على تعليق
router.patch('/:id/approve', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    // تحديث متوسط التقييم للوجبة
    await updateMealRating(comment.mealId);

    res.json({
      success: true,
      message: 'تم الموافقة على التعليق',
      data: comment
    });

  } catch (error) {
    console.error('خطأ في الموافقة على التعليق:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// رفض تعليق
router.patch('/:id/reject', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم رفض التعليق',
      data: comment
    });

  } catch (error) {
    console.error('خطأ في رفض التعليق:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// حذف تعليق
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    // تحديث متوسط التقييم للوجبة
    await updateMealRating(comment.mealId);

    res.json({
      success: true,
      message: 'تم حذف التعليق بنجاح'
    });

  } catch (error) {
    console.error('خطأ في حذف التعليق:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// دالة لتحديث متوسط التقييم للوجبة
async function updateMealRating(mealId) {
  try {
    const approvedComments = await Comment.find({
      mealId,
      isApproved: true
    });

    if (approvedComments.length > 0) {
      const totalRating = approvedComments.reduce((sum, comment) => sum + comment.rating, 0);
      const averageRating = totalRating / approvedComments.length;

      await Meal.findByIdAndUpdate(mealId, {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: approvedComments.length
      });
    } else {
      await Meal.findByIdAndUpdate(mealId, {
        averageRating: 0,
        totalReviews: 0
      });
    }
  } catch (error) {
    console.error('خطأ في تحديث تقييم الوجبة:', error);
  }
}

module.exports = router;
