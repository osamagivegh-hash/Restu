@echo off
echo Stopping all Oriental Restaurant servers...

echo.
echo Killing all Node.js processes...
taskkill /f /im node.exe

echo.
echo All servers stopped!
echo.
pause
