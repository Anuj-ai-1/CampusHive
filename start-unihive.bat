@echo off
title UniHive - Full Stack Server (Backend + Frontend)
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "%~dp0"
echo Starting UniHive Backend (SQLite + Express) and Frontend (Vite)...
echo Open http://localhost:5173 in your browser once ready.
echo.
npm.cmd run dev
pause
