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
        const createSQL = await exec(`${COMMAND} --compact --no-data ${config.database}>${path.join(tempFolder, "create.sql")}`)
        const insertSQL = await exec(`${COMMAND} --no-create-info --extended-insert=FALSE --hex-blob ${config.database}> ${path.join(tempFolder, 'data.sql')}`)

        //compress to a zip file
        Promise.allSettled([createSQL, insertSQL]).then(res => {
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