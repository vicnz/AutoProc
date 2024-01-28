::run every friday 12:30

@ECHO OFF
setlocal
	@REM set MYSQL_HOSTNAME=localhost
	@REM set MYSQL_PORT=3306
	@REM set MYSQL_USERNAME=adamg
	@REM set MYSQL_PASSWORD=zachwaterson09
	@REM set DATABASE_NAME=autoproc_db
	set SQL_SCRIPT="%~dp0run.sql"
	FOR /F "tokens=*" %%i in (%USERPROFILE%\.autoproc\tasks\.env) do SET %%i

	echo Checking for delayed deliveries...
	mysql -h %MYSQL_HOSTNAME% -u%MYSQL_USERNAME% -p%MYSQL_PASSWORD% %DATABASE_NAME% < %SQL_SCRIPT%
	echo Done.
endlocal