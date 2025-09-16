# 🐉 التنين الذهبي - مطعم شرقي

موقع مطعم شرقي متكامل مع لوحة إدارة حديثة.

## 🚀 الميزات

- **الصفحة الرئيسية**: تصميم عصري مع قائمة طعام تفاعلية
- **لوحة الإدارة**: إدارة شاملة للوجبات والإعلانات والطلبات
- **نظام التعليقات**: تقييمات العملاء للوجبات
- **نظام الإعلانات**: إدارة الإعلانات والأخبار
- **تصميم متجاوب**: يعمل على جميع الأجهزة
- **خطوط عربية جميلة**: خطوط Cairo و Amiri

## 🛠️ التقنيات المستخدمة

### Frontend
- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **Multer** - File Upload
- **Express Validator** - Validation

### Admin Panel
- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Forms
- **Axios** - HTTP Client
- **React Hot Toast** - Notifications

## 📁 هيكل المشروع

```
oriental-restaurant/
├── frontend/          # الصفحة الرئيسية
├── admin/            # لوحة الإدارة
├── backend/          # API الخادم
├── render.yaml       # إعدادات Render
└── package.json      # إعدادات المشروع الرئيسي
```

## 🚀 التشغيل المحلي

### 1. تثبيت المتطلبات
```bash
npm run install:all
```

### 2. تشغيل جميع الخدمات
```bash
npm run dev
```

### 3. تشغيل الخدمات منفصلة
```bash
# Backend (Port 5000)
npm run dev:backend

# Frontend (Port 3000)
npm run dev:frontend

# Admin Panel (Port 3002)
npm run dev:admin
```

## 🌐 النشر على Render

### 1. إعداد Render
- اربط GitHub repository مع Render
- استخدم ملف `render.yaml` للإعدادات

### 2. متغيرات البيئة
```env
# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://oriental-restaurant-frontend.onrender.com
PORT=10000

# Frontend & Admin
NEXT_PUBLIC_BACKEND_URL=https://oriental-restaurant-backend.onrender.com
```

### 3. URLs النشر
- **Frontend**: https://oriental-restaurant-frontend.onrender.com
- **Admin**: https://oriental-restaurant-admin.onrender.com
- **Backend**: https://oriental-restaurant-backend.onrender.com

## 📱 الصفحات

### Frontend
- `/` - الصفحة الرئيسية
- `/#menu` - قائمة الطعام
- `/#about` - من نحن
- `/#careers` - الوظائف
- `/#contact` - اتصل بنا

### Admin Panel
- `/dashboard` - لوحة التحكم
- `/dashboard/menu` - إدارة الوجبات
- `/dashboard/ads` - إدارة الإعلانات
- `/dashboard/contacts` - الرسائل
- `/dashboard/applications` - طلبات الوظائف

## 🔧 استكشاف الأخطاء

### مشاكل النشر
1. تأكد من أن `render.yaml` موجود في الجذر
2. تحقق من متغيرات البيئة
3. تأكد من أن الـ build ينجح محلياً

### مشاكل قاعدة البيانات
1. تحقق من اتصال MongoDB Atlas
2. تأكد من صحة MONGODB_URI
3. تحقق من إعدادات CORS

## 📞 الدعم

للدعم التقني، يرجى التواصل عبر:
- **Email**: support@goldendragon.com
- **GitHub Issues**: [إنشاء issue جديد](https://github.com/osamagivegh-hash/Restu/issues)

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

---

**تم التطوير بـ ❤️ للمطاعم الشرقية**