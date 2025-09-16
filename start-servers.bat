@echo off
echo Starting Oriental Restaurant System...

echo.
echo Killing any existing Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo.
echo Waiting 3 seconds for ports to be released...
timeout /t 3 /nobreak >nul

echo.
echo Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Admin Panel (Port 3002)...
start "Admin Panel" cmd /k "cd admin && npm run dev"

echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo.
echo Starting Main Frontend (Port 3000)...
start "Main Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All servers are starting up!
echo.
echo URLs:
echo - Main Website: http://localhost:3000
echo - Admin Panel: http://localhost:3002
echo - Backend API: http://localhost:5000
echo.
echo Admin Login: admin / admin123
echo.
echo Press any key to exit this window...
pause >nul
