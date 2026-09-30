@echo off
REM 一键更新网站 —— 真正的逻辑在 scripts\push.mjs
REM 本文件必须保持纯 ASCII：cmd 用系统代码页读批处理文件，
REM 一旦在 chcp 65001 之后出现中文行，cmd 会用旧代码页算出的偏移去读，
REM 导致整行被从中间劈开当成命令执行。
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
