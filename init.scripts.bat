@ECHO OFF

setlocal
    echo "Initialize Task Schedulers for Autoproc (Required Step)"
    
    :choice
	set /P choice="Proceed? [Y/N]: "
	if /I "%choice%"=="Y" goto :yes
	if /I "%choice%"=="N" goto :no
	goto :choice

    :yes
    ::copy directory
    set TASK_DIR=%USERPROFILE%\.autoproc\tasks

    IF NOT EXIST "%USERPROFILE%\.autoproc" MKDIR "%USERPROFILE%\.autoproc"

    echo "Copying Files ... "
    robocopy tasks %TASK_DIR% /E
    echo "File Copied ... "

    ::create scheduler for backup
    echo "Creating Task Scheduler for Backup..."
    schtasks /create /tn "autoproc-backup" /tr "%TASK_DIR%\backup\backup.bat" /sc  weekly /d FRI /st 12:30

    ::create scheduler for monitoring
    echo "Creating Task Scheduler for Monitoring..."
    schtasks /create /tn "autoproc-monitor" /tr "%TASK_DIR%\monitor\monitoring.bat" /sc daily /st 12:30
    goto :end
    
    @REM choice NO
    :no
    echo "Cancelled..."
    goto :end
    
    @REM completed transaction
    :end
    pause
endlocal