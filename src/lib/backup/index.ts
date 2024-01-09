import dayjs from "dayjs";
import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'
import { logger } from "@logger";
import util from 'node:util'
const exec = util.promisify(require('node:child_process').exec);
import compress from 'compressing'

const config = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_DATABASE as string
}

const BACKUP_DIR = path.join(process.cwd(), ".backups")
const COMMAND = `mysqldump -u${config.user} -p${config.password}`
const CREATE_FILENAME = "create.sql"
const INSERT_FILENAME = 'data.sql'
const RESTORE_FILENAME = 'restore.cmd'

const SCRIPT_COMMAND = `
@echo off
SET MYSQL_EXE=${`mysql`}
SET USER=${config.user}
SET PASSWORD=${config.password}
SET DATABASE=${'autoproc_db_test'}
SET HOSTNAME=${config.host}
SET PORT=3306

%MYSQL_EXE% -u${config.user} -p${config.password} -e "DROP DATABASE IF EXISTS %DATABASE%;CREATE DATABASE %DATABASE%;"

echo Creating table structure from ${CREATE_FILENAME}...s
%MYSQL_EXE% -h %HOSTNAME% -P %PORT% -u %USER% -p%PASSWORD% %DATABASE% < ${CREATE_FILENAME}

echo Restoring data from ${INSERT_FILENAME}...
%MYSQL_EXE% -h %HOSTNAME% -P %PORT% -u %USER% -p%PASSWORD% %DATABASE% < ${INSERT_FILENAME}

echo Database restoration complete.
pause
`;

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
        const restoreScript = await fsPromise.writeFile(path.join(tempFolder, RESTORE_FILENAME), SCRIPT_COMMAND, 'utf8')
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


// const fs = require('fs');

// const cmdContent = `
// @echo off
// SET MYSQL_EXE=mysql
// SET USER=root
// SET PASSWORD=your_password
// SET DATABASE=your_database
// SET HOSTNAME=localhost
// SET PORT=3306

// echo Creating database structure from create-statements.sql...
// %MYSQL_EXE% -h %HOSTNAME% -P %PORT% -u %USER% -p%PASSWORD% < create-statements.sql

// echo Restoring data from data.sql...
// %MYSQL_EXE% -h %HOSTNAME% -P %PORT% -u %USER% -p%PASSWORD% %DATABASE% < data.sql

// echo Database restoration complete.
// `;

// fs.writeFile('sample.cmd', cmdContent, (err) => {
//   if (err) throw err;
//   console.log('The CMD script has been saved!');
// });
