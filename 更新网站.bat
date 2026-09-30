@echo off
REM One-click site update. The real logic lives in scripts\push.mjs
REM IMPORTANT: keep this file pure ASCII. cmd parses .bat files using the
REM system codepage (936 here) while the file is UTF-8, so any non-ASCII
REM byte shifts cmd's read offset and splits lines in half mid-command.
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo   [X] Node.js not found. Please install Node.js first.
    echo.
    pause
    exit /b 1
)

node "scripts\push.mjs"
