@echo off
chcp 65001 >nul
title Local MD Viewer
echo 正在启动 Local MD Viewer...
echo.
cd /d "%~dp0"
npm run dev
pause
