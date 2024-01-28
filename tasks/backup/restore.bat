
@ECHO OFF
openfiles >NUL 2>&1 
if NOT %ERRORLEVEL% EQU 0 goto NotAdmin 
	setlocal
	set DATABASE_NAME=autoproc_db

	echo Make sure that mysql.exe is in the system PATH before running this script!
	pause

	:choice
	set /P choice="This will override data from the current Database, Proceed? [Y/N]: "
	if /I "%choice%"=="Y" goto :yes
	if /I "%choice%"=="N" goto :no
	goto :choice

	:yes

		@REM GET HOSTNAME
		set /P MYSQL_HOSTNAME="Enter Hostname, Press Enter to use default, [default=localhost]?: "
		
		IF "%MYSQL_HOSTNAME%"=="" (
			set MYSQL_HOSTNAME=localhost
		)

		@REM GET PORT
		set /P MYSQL_PORT="Enter Port Number, Press Enter to use default [default=3306]?: "
		IF "%MYSQL_PORT%"=="" (
  			set MYSQL_PORT=3306
		)
		
		@REM GET USERNAME
		set /P MYSQL_USERNAME="Enter Username?: "
		IF "%MYSQL_USERNAME%"=="" (
  			ECHO No Username Specified.
  			PAUSE
  			EXIT /B 1
		)

		@REM GET PASSWORD
		set /P MYSQL_PASSWORD="Enter User Password, Press enter if user does not have a password?: "
		IF "%MYSQL_PASSWORD%"=="" (
  			set MYSQL_PASSWORD=""
		)

		echo Creating Database ....
		mysql -h%MYSQL_HOSTNAME% -p%MYSQL_PORT% -u%MYSQL_USERNAME% -p%MYSQL_PASSWORD% -e "DROP DATABASE IF EXISTS %DATABASE_NAME%; CREATE DATABASE %DATABASE_NAME%"
		echo %DATABASE_NAME% created ...
		echo Creating Tables ...
		mysql -h %MYSQL_HOSTNAME% -P %MYSQL_PORT% -u%MYSQL_USERNAME% -p%MYSQL_PASSWORD% %DATABASE_NAME% < "%~dp0create-table.sql"
		echo Tables Created ...
		echo Restoring Database Data ...
		mysql -h %MYSQL_HOSTNAME% -P %MYSQL_PORT% -u %MYSQL_USERNAME% -p%MYSQL_PASSWORD% %DATABASE_NAME% < "%~dp0data.sql"
		echo Data Restored ...
		echo Database Restoration Complete...
	goto :end

	:no
	echo "Cancelled..."
	goto :end

	:end
	echo "Done."
goto End
:NotAdmin 
echo Requires Elevated System Privileges. 
:End