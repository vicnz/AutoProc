/**
 * AUTOMATIC BACK-UP
 */

import { schedule } from "node-cron";
import { logger } from "@logger";
import { generateBackup } from "@lib/backup";

// const interval = `*/5 * * * *`; //! SET FOR NOW 5 MINUTES
const interval = `0 0 * * 0` //! every Sunday at 12:00am
//Store the back up in an SQL File Store in Server as a 
export async function autoBackup() {
    logger.info("Initialized Automatic Backup at Every Sunday Morning Seconds Interval")

    return schedule(interval, async (now) => {
        await generateBackup(now)
    })

}

