@echo off
echo ==========================================
echo    UPDATE PORTFOLIO WEBSITE
echo ==========================================
echo.

:: Check if there are changes
git status --porcelain >nul
if %ERRORLEVEL% == 0 (
    echo Checking for changes...
    git status
    echo.
    
    :: Ask for commit message
    set /p commit_msg="Masukkan pesan commit: "
    
    :: Add all changes
    echo Adding changes...
    git add -A
    
    :: Commit changes
    echo Committing changes...
    git commit -m "%commit_msg%"
    
    :: Push to GitHub
    echo Pushing to GitHub...
    git push origin main
    
    echo.
    echo ==========================================
    echo    UPDATE BERHASIL!
    echo ==========================================
    echo.
    echo Website akan diperbarui dalam 3-10 menit di:
    echo https://rafikary.github.io/PortfolioRafikaRy
    echo.
) else (
    echo Tidak ada perubahan yang perlu di-update.
    echo.
)

echo Tekan sembarang tombol untuk keluar...
pause >nul
