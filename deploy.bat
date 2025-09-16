@echo off
echo 🚀 Oriental Restaurant Deployment Script
echo ========================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo.
echo 📋 Deployment Options:
echo 1. Separate Deployments (Recommended)
echo 2. Integrated Deployment (Admin with Backend)
echo 3. Build for Production
echo.

set /p choice="Choose deployment option (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🎯 Separate Deployments Setup
    echo =============================
    echo.
    echo Backend will be deployed separately from frontends.
    echo This is the recommended approach for scalability.
    echo.
    echo 📝 Steps:
    echo 1. Deploy backend to Render/Railway/Heroku
    echo 2. Deploy main frontend to Vercel/Netlify
    echo 3. Deploy admin panel to Vercel/Netlify
    echo.
    echo 🔧 Environment Variables needed:
    echo Backend: MONGODB_URI, FRONTEND_URL
    echo Frontend: NEXT_PUBLIC_BACKEND_URL
    echo Admin: NEXT_PUBLIC_BACKEND_URL
) else if "%choice%"=="2" (
    echo.
    echo 🎯 Integrated Deployment Setup
    echo ==============================
    echo.
    echo Building admin panel to be served by backend...
    
    echo 📦 Building admin panel...
    cd admin
    call npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ Admin panel built successfully
    ) else (
        echo ❌ Admin panel build failed
        pause
        exit /b 1
    )
    
    cd ..
    
    echo.
    echo 📝 Next steps:
    echo 1. Deploy backend using server-integrated.js
    echo 2. Deploy main frontend separately
    echo 3. Admin panel will be available at /admin route
) else if "%choice%"=="3" (
    echo.
    echo 🎯 Production Build
    echo ==================
    echo.
    
    echo 📦 Building main frontend...
    cd frontend
    call npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ Main frontend built successfully
    ) else (
        echo ❌ Main frontend build failed
        pause
        exit /b 1
    )
    
    cd ..
    
    echo 📦 Building admin panel...
    cd admin
    call npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ Admin panel built successfully
    ) else (
        echo ❌ Admin panel build failed
        pause
        exit /b 1
    )
    
    cd ..
    
    echo.
    echo ✅ All builds completed successfully!
    echo 📁 Built files are in:
    echo    - frontend/out/
    echo    - admin/out/
) else (
    echo ❌ Invalid option. Please choose 1, 2, or 3.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment setup complete!
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md
echo.
echo 🔗 Useful URLs after deployment:
echo    - Main Website: https://your-frontend.vercel.app
echo    - Admin Panel: https://your-admin.vercel.app
echo    - Backend API: https://your-backend.onrender.com
echo.
echo 🔑 Admin Login: admin / admin123
echo.
pause
