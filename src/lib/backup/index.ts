import dayjs from "dayjs";
import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'
import { logger } from "@logger";
import util from 'node:util'
const exec = util.promisify(require('node:child_process').exec);
import compress from 'compressing'
import { tmpdir } from 'os'

const config = {
	user: process.env.DB_USER as string,
	password: process.env.DB_PASSWORD as string,
	host: process.env.DB_HOST as string,
	database: process.env.DB_DATABASE as string
}

const BACKUP_DIR = path.join(tmpdir(), ".backups")
const COMMAND = `mysqldump -u${config.user} -p${config.password}`
const CREATE_FILENAME = "create.sql"
const INSERT_FILENAME = 'data.sql'
const RESTORE_FILENAME = 'restore.bat'

const RESTORE_COMMAND = `
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
`

export const generateBackup = async (now: any, label?: string) => {
	const backupLabel = label || 'default'
	const currentDate = dayjs(now)
	try {
		if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);
		const folderName = `${currentDate.format('YYYY_MM_DD_hh_mm_ss')}`
		const tempFolder = `${path.join(BACKUP_DIR, folderName)}`

		//create temp-folder
		fs.mkdirSync(tempFolder)
		//generate sqls
		const createSQL = await exec(`${COMMAND} --no-data --ignore-table=${config.database}._prisma_migrations ${config.database}>${path.join(tempFolder, CREATE_FILENAME)}`)
		const insertSQL = await exec(`${COMMAND} --no-create-info --extended-insert=FALSE --hex-blob --ignore-table=${config.database}._prisma_migrations ${config.database}> ${path.join(tempFolder, INSERT_FILENAME)}`)
		const restoreScript = await fsPromise.writeFile(path.join(tempFolder, RESTORE_FILENAME), RESTORE_COMMAND, 'utf8')
		//compress to a zip file
		Promise.allSettled([createSQL, insertSQL, restoreScript]).then(res => {
			compress.tgz.compressDir(tempFolder, `${tempFolder}.${backupLabel}.tgz`).then(res => {
				fsPromise.rm(tempFolder, { recursive: true, force: true }).then(() => {
					logger.info(`Backup Created | ${currentDate.format('MM-DD-YYYY:(hh:mm:ss)')}`)
				})
			})
		})
		return { filePath: `${tempFolder}.${backupLabel}.tgz`, fileName: `${folderName}.${backupLabel}.tgz` }
	} catch (err) {
		if (err instanceof Error) {
			logger.error(`Failed to create Backup: ${err.message}`)
		}
	}
}
