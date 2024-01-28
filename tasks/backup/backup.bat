::run every friday 12:00

@ECHO off
setlocal

@REM set MYSQL_USERNAME=adamg
@REM set MYSQL_PASSWORD=zachwaterson09
@REM set DATABASE_NAME=autoproc_db
set OUTPUT_DIR=%USERPROFILE%\.autoproc\backups

::SET VARIABLES FOR DATABASE CONNECTION
FOR /F "tokens=*" %%i in (%USERPROFILE%\.autoproc\tasks\.env) do SET %%i

IF NOT EXIST "%OUTPUT_DIR%" (
   MKDIR "%OUTPUT_DIR%"
)

echo Creating SQL dump...
mysqldump --user=%MYSQL_USERNAME% --password=%MYSQL_PASSWORD% --host=localhost --port=3306 --no-data --ignore-table=%DATABASE_NAME%._prisma_migrations %DATABASE_NAME% > "%OUTPUT_DIR%\create-table.sql"
echo Creating table structure...
mysqldump --user=%MYSQL_USERNAME% --password=%MYSQL_PASSWORD% --host=localhost --port=3306 --no-create-info --extended-insert=FALSE --hex-blob --ignore-table=%DATABASE_NAME%._prisma_migrations %DATABASE_NAME% > "%OUTPUT_DIR%\data.sql"
echo Creating restore script...

type "%~dp0restore.bat" >> "%OUTPUT_DIR%\init-restore.bat"

echo Compressing files...
tar -czvf "%OUTPUT_DIR%\%DATABASE_NAME%_%date:/=-%_%time::=-%.tgz" -C "%OUTPUT_DIR%" create-table.sql data.sql init-restore.bat

del "%OUTPUT_DIR%\init-restore.bat" "%OUTPUT_DIR%\create-table.sql" "%OUTPUT_DIR%\data.sql"

echo Done.
endlocal

