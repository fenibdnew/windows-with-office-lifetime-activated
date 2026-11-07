import { TechnicianProfile } from '../types';

export function generateRegScript(p: TechnicianProfile): string {
  // Format support notes with escaped quotes and proper registry string format
  const sanitizedNotes = p.supportNotes.replace(/\r\n|\n/g, '\\n').replace(/"/g, '\\"');

  return `Windows Registry Editor Version 5.00

; ============================================================================
;  STC TECH HAND - WINDOWS OEM BRANDING & SYSTEM PROPERTIES CONFIGURATION
;  Managing Director: ${p.name}
;  Location: ${p.location}
; ============================================================================

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation]
"Manufacturer"="${p.manufacturer}"
"Model"="${p.model}"
"SupportHours"="${p.supportHours}"
"SupportPhone"="${p.phone}"
"SupportURL"="${p.supportUrl}"
"Logo"="C:\\\\Windows\\\\System32\\\\oemlogo.bmp"
"SupportNotes"="${sanitizedNotes}"

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion]
"RegisteredOwner"="${p.registeredOwner}"
"RegisteredOrganization"="${p.registeredOrganization}"
`;
}

export function generateCmdScript(p: TechnicianProfile, logoBase64?: string): string {
  const defaultBase64 = logoBase64 || 'Qk1GAAAAAAAAADYAAAAoAAAAeAAAAHgAAAABABgAAAAAAADAkgAAKxkAACsZAAAAAAAAAAAA////////////////////////////////////////////////////////////////';

  return `@echo off
:: ============================================================================
::  STC TECH HAND - AUTOMATED OEM BRANDING & TECHNICIAN IDENTITY INJECTOR
::  Managing Director: ${p.name}
::  Address: ${p.location}
::  Phone: ${p.phone} | Hours: ${p.supportHours}
::  Website: ${p.supportUrl}
:: ============================================================================

setlocal EnableExtensions
setlocal EnableDelayedExpansion

:: Elevate to Administrator if not already elevated
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [STC Tech Hand] Requesting Administrator Privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~f0\"' -Verb RunAs"
    exit /b
)

title STC Tech Hand - System Properties & OEM Brand Integrator
color 0B
cls

echo ===============================================================================
echo                STC TECH HAND - COMPUTER SERVICE & SOLUTIONS
echo                 Managing Director: ${p.name}
echo                           Location: ${p.location}
echo ===============================================================================
echo.
echo [*] Applying Official OEM Branding to Windows System Properties...
echo.

:: 1. Write OEM Logo to System32 (oemlogo.bmp)
set "LogoPath=%SystemRoot%\\System32\\oemlogo.bmp"
echo [*] Installing High-Definition OEM Logo to %LogoPath%...
powershell -Command "$b = [System.Convert]::FromBase64String('${defaultBase64}'); [System.IO.File]::WriteAllBytes('%LogoPath%', $b)" >nul 2>&1

:: Also copy to SysWOW64 for 32-bit compatibility if running on 64-bit Windows
if exist "%SystemRoot%\\SysWOW64" (
    copy /y "%LogoPath%" "%SystemRoot%\\SysWOW64\\oemlogo.bmp" >nul 2>&1
)

:: 2. Register OEM Information
echo [*] Configuring HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Manufacturer" /t REG_SZ /d "${p.manufacturer}" /f >nul
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Model" /t REG_SZ /d "${p.model}" /f >nul
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportHours" /t REG_SZ /d "${p.supportHours}" /f >nul
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportPhone" /t REG_SZ /d "${p.phone}" /f >nul
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportURL" /t REG_SZ /d "${p.supportUrl}" /f >nul
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Logo" /t REG_SZ /d "%SystemRoot%\\System32\\oemlogo.bmp" /f >nul

:: 3. Register RegisteredOwner & RegisteredOrganization
echo [*] Updating Registered Owner and Organization...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "RegisteredOwner" /t REG_SZ /d "${p.registeredOwner}" /f >nul
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "RegisteredOrganization" /t REG_SZ /d "${p.registeredOrganization}" /f >nul

:: 4. 32-bit Registry Redirection for complete coverage
if exist "%SystemRoot%\\SysWOW64" (
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Manufacturer" /t REG_SZ /d "${p.manufacturer}" /reg:32 /f >nul 2>&1
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Model" /t REG_SZ /d "${p.model}" /reg:32 /f >nul 2>&1
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportHours" /t REG_SZ /d "${p.supportHours}" /reg:32 /f >nul 2>&1
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportPhone" /t REG_SZ /d "${p.phone}" /reg:32 /f >nul 2>&1
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportURL" /t REG_SZ /d "${p.supportUrl}" /reg:32 /f >nul 2>&1
    reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Logo" /t REG_SZ /d "%SystemRoot%\\System32\\oemlogo.bmp" /reg:32 /f >nul 2>&1
)

echo.
echo ===============================================================================
echo [SUCCESS] STC Tech Hand OEM Branding successfully installed!
echo.
echo  - Manufacturer : ${p.manufacturer}
echo  - Model        : ${p.model}
echo  - Registered To: ${p.registeredOwner} (%p.registeredOrganization%)
echo  - Contact      : ${p.phone} (%p.location%)
echo  - Support Logo : %LogoPath%
echo ===============================================================================
echo.
echo Opening Windows System Properties to verify...
start control /name Microsoft.System
echo.
pause
exit /b
`;
}

export function generatePs1Script(p: TechnicianProfile, logoBase64?: string): string {
  const defaultBase64 = logoBase64 || 'Qk1GAAAAAAAAADYAAAAoAAAAeAAAAHgAAAABABgAAAAAAADAkgAAKxkAACsZAAAAAAAAAAAA////////////////////////////////////////////////////////////////';

  return `# ============================================================================
#  STC TECH HAND - POWERSHELL OEM IDENTITY & SYSTEM PROPERTIES INTEGRATOR
#  Managing Director: ${p.name}
#  Location: ${p.location}
# ============================================================================

# Ensure running as Administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Warning "Administrator rights required. Relaunching elevated..."
    Start-Process powershell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File \`"$PSCommandPath\`""
    Exit
}

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "       STC TECH HAND - COMPUTER REPAIR & SYSTEM OPTIMIZATION" -ForegroundColor Green
Write-Host "         Managing Director: ${p.name} | ${p.location}" -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Write OEM Logo
$logoPath = "$env:SystemRoot\\System32\\oemlogo.bmp"
Write-Host "[*] Extracting STC Tech Hand OEM Logo to $logoPath..." -ForegroundColor White
$logoBytes = [System.Convert]::FromBase64String('${defaultBase64}')
[System.IO.File]::WriteAllBytes($logoPath, $logoBytes)

if (Test-Path "$env:SystemRoot\\SysWOW64") {
    Copy-Item -Path $logoPath -Destination "$env:SystemRoot\\SysWOW64\\oemlogo.bmp" -Force -ErrorAction SilentlyContinue
}

# 2. Configure OEMInformation Registry
$oemReg = "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation"
Write-Host "[*] Configuring OEM Registry Keys in $oemReg..." -ForegroundColor White

if (-not (Test-Path $oemReg)) {
    New-Item -Path $oemReg -Force | Out-Null
}

Set-ItemProperty -Path $oemReg -Name "Manufacturer" -Value "${p.manufacturer}" -Force
Set-ItemProperty -Path $oemReg -Name "Model" -Value "${p.model}" -Force
Set-ItemProperty -Path $oemReg -Name "SupportHours" -Value "${p.supportHours}" -Force
Set-ItemProperty -Path $oemReg -Name "SupportPhone" -Value "${p.phone}" -Force
Set-ItemProperty -Path $oemReg -Name "SupportURL" -Value "${p.supportUrl}" -Force
Set-ItemProperty -Path $oemReg -Name "Logo" -Value "C:\\Windows\\System32\\oemlogo.bmp" -Force

# 3. Configure Registered Owner
$ntReg = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion"
Write-Host "[*] Configuring Registered Owner ($ntReg)..." -ForegroundColor White
Set-ItemProperty -Path $ntReg -Name "RegisteredOwner" -Value "${p.registeredOwner}" -Force
Set-ItemProperty -Path $ntReg -Name "RegisteredOrganization" -Value "${p.registeredOrganization}" -Force

Write-Host ""
Write-Host "[SUCCESS] STC Tech Hand Branding Configured Successfully!" -ForegroundColor Green
Write-Host "  Owner: ${p.registeredOwner}" -ForegroundColor Gray
Write-Host "  Shop : ${p.registeredOrganization} (${p.location})" -ForegroundColor Gray
Write-Host "  Phone: ${p.phone}" -ForegroundColor Gray
Write-Host ""
Write-Host "Opening System Properties (sysdm.cpl)..." -ForegroundColor Cyan
Start-Process "control.exe" -ArgumentList "/name Microsoft.System"
`;
}

export function generatePowerShellOneLiner(p: TechnicianProfile): string {
  // Ultra-compact one-liner to run in elevated powershell
  return `powershell -ExecutionPolicy Bypass -Command "& { irm https://raw.githubusercontent.com/stctechhand/oem/main/install.ps1 | iex }"`;
}

export function generateOfflineOneLiner(p: TechnicianProfile): string {
  return `powershell -Command "New-Item -Path 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation' -Force; Set-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation' -Name 'Manufacturer' -Value '${p.manufacturer}'; Set-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation' -Name 'Model' -Value '${p.model}'; Set-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation' -Name 'SupportPhone' -Value '${p.phone}'; Set-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation' -Name 'SupportHours' -Value '${p.supportHours}'; Set-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion' -Name 'RegisteredOwner' -Value '${p.registeredOwner}'; Set-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion' -Name 'RegisteredOrganization' -Value '${p.registeredOrganization}'; Write-Host '[SUCCESS] STC Tech Hand OEM Branding Applied!' -ForegroundColor Green"`;
}

export function generateMasPatch(p: TechnicianProfile): string {
  return `:: =========================================================================================
::  HOW TO INTEGRATE STC TECH HAND BRANDING INTO MAS_AIO.cmd
:: =========================================================================================
::  1. Open your MAS_AIO.cmd in Notepad.
::  2. Add the following function :STC_OEM_Branding at the bottom of the script.
::  3. Call it automatically right after activation succeeds (under :dl_final and :oh_process)
::     or add it as option [B] in :MainMenu!
:: =========================================================================================

:: --- STEP 1: Add option [B] to :MainMenu in MAS_AIO.cmd ---
:: Find :MainMenu and add this line inside the menu:
:: echo:             [B] STC Tech Hand OEM Branding  ^|  System Properties
::
:: In the choice command, change:
:: choice /C:123456789H0B /N
:: And add:
:: if %_erl%==12 setlocal & call :STC_OEM_Branding & cls & endlocal & goto :MainMenu

:: --- STEP 2: Automatic Call on Activation ---
:: In :dl_final (after HWID activation succeeds):
:: call :STC_OEM_Branding
::
:: In :OhookActivation (after Office activation succeeds):
:: call :STC_OEM_Branding

:: --- STEP 3: Paste this subroutine anywhere before the EOF in MAS_AIO.cmd ---

:STC_OEM_Branding
cls
echo ___________________________________________________________________________________________
echo:
call :dk_color %_Green% "   Setting STC Tech Hand OEM Branding ^& System Properties..."
echo ___________________________________________________________________________________________
echo:

:: Set OEM Information in Registry
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Manufacturer" /t REG_SZ /d "${p.manufacturer}" /f %nul%
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Model" /t REG_SZ /d "${p.model}" /f %nul%
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportHours" /t REG_SZ /d "${p.supportHours}" /f %nul%
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportPhone" /t REG_SZ /d "${p.phone}" /f %nul%
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportURL" /t REG_SZ /d "${p.supportUrl}" /f %nul%
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Logo" /t REG_SZ /d "%SystemRoot%\\System32\\oemlogo.bmp" /f %nul%

:: Set Registered Owner & Organization
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "RegisteredOwner" /t REG_SZ /d "${p.registeredOwner}" /f %nul%
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "RegisteredOrganization" /t REG_SZ /d "${p.registeredOrganization}" /f %nul%

echo    Manufacturer : ${p.manufacturer}
echo    Managing Dir : ${p.name}
echo    Address      : ${p.location}
echo    Hotline      : ${p.phone}
echo:
call :dk_color %Green% "   OEM Identity successfully linked with Windows & Office License!"
echo ___________________________________________________________________________________________
timeout /t 3 %nul%
exit /b
`;
}

export function generateOemSetupComplete(p: TechnicianProfile): string {
  return `@echo off
:: ============================================================================
::  $OEM$ Post-Install Automated Setup Script (SetupComplete.cmd)
::  Placed in: \\sources\\$OEM$\\$$\\Setup\\Scripts\\SetupComplete.cmd
::  Runs automatically with SYSTEM privileges on first Windows boot!
:: ============================================================================

fltmc >nul || exit /b

:: 1. Apply STC Tech Hand OEM Branding
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Manufacturer" /t REG_SZ /d "${p.manufacturer}" /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Model" /t REG_SZ /d "${p.model}" /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportHours" /t REG_SZ /d "${p.supportHours}" /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportPhone" /t REG_SZ /d "${p.phone}" /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "SupportURL" /t REG_SZ /d "${p.supportUrl}" /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\OEMInformation" /v "Logo" /t REG_SZ /d "%SystemRoot%\\System32\\oemlogo.bmp" /f

:: 2. Set Registered Owner & Organization
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "RegisteredOwner" /t REG_SZ /d "${p.registeredOwner}" /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v "RegisteredOrganization" /t REG_SZ /d "${p.registeredOrganization}" /f

:: 3. Run MAS Activation if present in same directory
if exist "%~dp0MAS_AIO.cmd" (
    call "%~dp0MAS_AIO.cmd" /HWID /Ohook
)

:: 4. Cleanup script directory after installation
cd \\
(goto) 2>nul & (if "%~dp0"=="%SystemRoot%\\Setup\\Scripts\\" rd /s /q "%~dp0")
`;
}
