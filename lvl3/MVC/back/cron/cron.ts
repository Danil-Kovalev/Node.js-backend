import * as cron from 'node-cron';
import mysqldump from 'mysqldump';
import { CONFIG } from '../config/config.js';
import { YEAR, MONTH, DAY } from '../src/constants.js';

export async function deleteBook() {
    
}

export async function backupData() {
    cron.schedule('0 0 * * *', () => {
        mysqldump.default({
            connection: CONFIG,
            dumpToFile: `./back/backup/${YEAR}-${MONTH}-${DAY}-backup.sql`,
        })
    });
}