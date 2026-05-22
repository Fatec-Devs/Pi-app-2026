@echo off
REM Script para iniciar o Expo no Windows

echo.
echo 🚀 Iniciando Expo no Windows...
echo.

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não está instalado ou não foi adicionado ao PATH
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
)

REM Verifica a versão do Node.js
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% detectado

REM Verifica se expo-cli está disponível
where expo >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Expo CLI não encontrado globalmente
    echo Usando npx expo...
)

echo.
echo Iniciando Expo...
echo.

npx expo start --clear

pause
