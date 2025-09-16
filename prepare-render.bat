@echo off
echo 🚀 Preparing for Render Blueprint Deployment
echo ===========================================

REM Check if we're in the right directory
if not exist "render.yaml" (
    echo ❌ Error: render.yaml not found. Please run from project root.
    pause
    exit /b 1
)

echo.
echo 📋 Pre-deployment Checklist:
echo.

echo ✅ Checking render.yaml configuration...
if exist "render.yaml" (
    echo   - render.yaml found
) else (
    echo   ❌ render.yaml missing
    pause
    exit /b 1
)

echo ✅ Checking backend configuration...
if exist "backend\package.json" (
    echo   - Backend package.json found
) else (
    echo   ❌ Backend package.json missing
    pause
    exit /b 1
)

echo ✅ Checking frontend configuration...
if exist "frontend\package.json" (
    echo   - Frontend package.json found
) else (
    echo   ❌ Frontend package.json missing
    pause
    exit /b 1
)

echo ✅ Checking admin configuration...
if exist "admin\package.json" (
    echo   - Admin package.json found
) else (
    echo   ❌ Admin package.json missing
    pause
    exit /b 1
)

echo.
echo 🔧 Environment Variables to Set in Render:
echo.
echo Backend Service:
echo   - MONGODB_URI: mongodb+srv://osamagivegh:990099@cluster0.npzs81o.mongodb.net/oriental-restaurant?retryWrites=true&w=majority&appName=Cluster0
echo   - NODE_ENV: production
echo   - FRONTEND_URL: https://oriental-restaurant-frontend.onrender.com
echo   - PORT: 10000
echo.
echo Frontend Service:
echo   - NEXT_PUBLIC_BACKEND_URL: https://oriental-restaurant-backend.onrender.com
echo.
echo Admin Service:
echo   - NEXT_PUBLIC_BACKEND_URL: https://oriental-restaurant-backend.onrender.com
echo.

echo 🚀 Ready for Render Deployment!
echo.
echo Next Steps:
echo 1. Push your code to GitHub
echo 2. Go to render.com and create a new Blueprint
echo 3. Connect your GitHub repository
echo 4. Set the environment variables above
echo 5. Deploy!
echo.
echo 📚 For detailed instructions, see RENDER_DEPLOYMENT.md
echo.
echo 🔗 Your URLs after deployment:
echo   - Main Website: https://oriental-restaurant-frontend.onrender.com
echo   - Admin Panel: https://oriental-restaurant-admin.onrender.com
echo   - Backend API: https://oriental-restaurant-backend.onrender.com
echo.
echo 🔑 Admin Login: admin / admin123
echo.
pause
