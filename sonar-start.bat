@echo off
setlocal

REM Prefer the project's local sonar-scanner (npm package) if present
set "ROOT=%~dp0"

if exist "%ROOT%node_modules\.bin\sonar-scanner.cmd" (
	"%ROOT%node_modules\.bin\sonar-scanner.cmd" %*
	exit /b %errorlevel%
)

REM Fallback: sonar-scanner available on PATH
where sonar-scanner >nul 2>&1
if %errorlevel%==0 (
	sonar-scanner %*
	exit /b %errorlevel%
)

echo [sonar-start] ERROR: sonar-scanner not found.
echo [sonar-start] Run: npm install
echo [sonar-start] Or install SonarScanner CLI and add it to PATH.
exit /b 1