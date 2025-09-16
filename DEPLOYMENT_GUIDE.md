# 🚀 دليل النشر على Render

## 📋 خطوات النشر على Render

### 1. التحقق من GitHub Repository
- تأكد من أن جميع التغييرات تم دفعها إلى GitHub
- Repository: `https://github.com/osamagivegh-hash/Restu`

### 2. النشر على Render

#### أ) إنشاء Blueprint جديد:
1. اذهب إلى [render.com](https://render.com)
2. سجل الدخول إلى حسابك
3. اضغط على "New +" → "Blueprint"
4. اختر "Connect GitHub Repository"
5. اختر repository: `osamagivegh-hash/Restu`

#### ب) إعداد Environment Variables:

**للـ Backend Service:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://osamagivegh:990099@cluster0.npzs81o.mongodb.net/oriental-restaurant?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=https://oriental-restaurant-frontend.onrender.com
PORT=10000
```

**للـ Frontend Service:**
```
NEXT_PUBLIC_BACKEND_URL=https://oriental-restaurant-backend.onrender.com
```

**للـ Admin Service:**
```
NEXT_PUBLIC_BACKEND_URL=https://oriental-restaurant-backend.onrender.com
```

### 3. مراقبة النشر

#### أ) تحقق من Logs:
- اذهب إلى كل service في Render Dashboard
- اضغط على "Logs" لمراقبة عملية البناء
- تأكد من عدم وجود أخطاء

#### ب) اختبار الـ Health Check:
- Backend: `https://oriental-restaurant-backend.onrender.com/api/health`
- يجب أن يعيد: `{"status":"OK","message":"Server is running"}`

### 4. استكشاف الأخطاء

#### مشاكل شائعة:

**1. Build Failures:**
- تحقق من أن جميع التبعيات موجودة في `package.json`
- تأكد من أن Node.js version متوافق (>=18.0.0)

**2. CORS Errors:**
- تأكد من أن CORS configuration في `backend/server.js` صحيح
- تحقق من أن URLs في `allowedOrigins` صحيحة

**3. Database Connection:**
- تأكد من أن MongoDB Atlas connection string صحيح
- تحقق من أن IP whitelist في MongoDB Atlas يسمح بـ Render IPs

**4. Environment Variables:**
- تأكد من أن جميع المتغيرات البيئية تم تعيينها بشكل صحيح
- تحقق من أن أسماء المتغيرات مطابقة تماماً

### 5. اختبار الميزات الجديدة

#### أ) اختبار API Endpoints:
```bash
# Health Check
curl https://oriental-restaurant-backend.onrender.com/api/health

# Comments
curl https://oriental-restaurant-backend.onrender.com/api/comments

# Ads
curl https://oriental-restaurant-backend.onrender.com/api/ads/active

# Meals
curl https://oriental-restaurant-backend.onrender.com/api/meals
```

#### ب) اختبار الواجهة الأمامية:
- اذهب إلى: `https://oriental-restaurant-frontend.onrender.com`
- تأكد من أن الخطوط العربية تظهر بشكل صحيح
- اختبر إضافة تعليق جديد
- تأكد من أن الإعلانات تظهر

#### ج) اختبار لوحة الإدارة:
- اذهب إلى: `https://oriental-restaurant-admin.onrender.com`
- سجل الدخول: `admin` / `admin123`
- اختبر إدارة التعليقات والإعلانات

### 6. URLs النهائية

بعد النشر الناجح:
- **الموقع الرئيسي**: `https://oriental-restaurant-frontend.onrender.com`
- **لوحة الإدارة**: `https://oriental-restaurant-admin.onrender.com`
- **Backend API**: `https://oriental-restaurant-backend.onrender.com`

### 7. الميزات الجديدة المتاحة

✅ **نظام التعليقات والتقييمات**
✅ **نظام الإعلانات**
✅ **رفع الصور للوجبات**
✅ **الواجهة العربية الكاملة**
✅ **الخطوط العربية الجميلة**
✅ **دعم RTL**

### 8. استكشاف الأخطاء المتقدم

إذا استمرت المشاكل:

1. **تحقق من Render Logs:**
   - اذهب إلى Service → Logs
   - ابحث عن أخطاء في البناء أو التشغيل

2. **تحقق من MongoDB Atlas:**
   - تأكد من أن Database متصل
   - تحقق من Network Access settings

3. **تحقق من CORS:**
   - تأكد من أن `allowedOrigins` في `server.js` تحتوي على Render URLs

4. **تحقق من Environment Variables:**
   - تأكد من أن جميع المتغيرات تم تعيينها بشكل صحيح

### 9. الدعم

إذا واجهت أي مشاكل:
1. تحقق من Render Documentation
2. راجع MongoDB Atlas Documentation
3. تأكد من أن جميع الخطوات تم اتباعها بشكل صحيح

---

**ملاحظة**: قد يستغرق النشر من 5-10 دقائق. تحلى بالصبر ومراقب الـ logs للتأكد من التقدم.

