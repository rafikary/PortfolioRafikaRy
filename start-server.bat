@echo off
echo ==========================================
echo    PORTFOLIO WEBSITE LOCAL SERVER
echo ==========================================
echo.

:: Check if XAMPP is installed
if not exist "C:\xampp\apache\bin\httpd.exe" (
    echo ERROR: XAMPP tidak ditemukan!
    echo Pastikan XAMPP sudah terinstall di C:\xampp\
    echo.
    pause
    exit /b 1
)

:: Check if Apache is running
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Apache sudah berjalan!
    echo.
) else (
    echo Starting Apache...
    start "" "C:\xampp\apache\bin\httpd.exe"
    timeout /t 3 >nul
    echo Apache started!
    echo.
)

:: Check if MySQL is needed (uncomment if using database)
:: tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
:: if "%ERRORLEVEL%"=="0" (
::     echo MySQL sudah berjalan!
::     echo.
:: ) else (
::     echo Starting MySQL...
::     start "" "C:\xampp\mysql\bin\mysqld.exe"
::     timeout /t 3 >nul
::     echo MySQL started!
::     echo.
:: )

echo ==========================================
echo Website portfolio siap digunakan!
echo ==========================================
echo.
echo URL: http://localhost/Portofolio
echo.
echo Untuk membuka website, klik link di atas
echo atau copy-paste ke browser Anda.
echo.
echo Untuk menghentikan server, tekan Ctrl+C
echo atau tutup jendela XAMPP Control Panel.
echo.

:: Open website in default browser
echo Membuka website di browser...
start "" "http://localhost/Portofolio"

echo.
echo ==========================================
echo     TEKAN SEMBARANG TOMBOL UNTUK KELUAR
echo ==========================================
pause >nul
