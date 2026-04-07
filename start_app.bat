@echo off
echo =======================================================
echo     Starting Universal Video Downloader...
echo =======================================================
echo.
echo 1. Starting Backend Server (Port 5001)...
start "Video Downloader Backend" cmd /k "npm run dev"

echo 2. Starting Frontend Server (Port 5173)...
start "Video Downloader Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All servers are starting! 
echo Please wait about 5-10 seconds for them to load.
echo Keep both of the new black windows open.
echo.
pause
