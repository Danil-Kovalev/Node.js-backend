import * as cron from 'node-cron';
import mysqldump from 'mysqldump';
import { CONFIG } from '../config/config.js';
import { YEAR, MONTH, DAY } from '../src/constants.js';
import { getMarkedBook, deleteBook } from '../src/scripts.js';
import { RowDataPacket } from 'mysql2';

/**
 * Delete books from database by mark "deleted" and every 1 minute delete
 */
export async function deleteMarkBook() {
    let id = await getMarkedBook();
    
    cron.schedule('* * * * *', () => {
        console.log("Deleted book");
        id.map((el: RowDataPacket) => {
            deleteBook(Number(el.id));
        })
    });
}

/**
 * Get all data from database for backup every day by cron
 */
export async function backupData() {
    cron.schedule('0 0 * * *', () => {
        mysqldump.default({
            connection: CONFIG,
            dumpToFile: `./back/backup/${YEAR}-${MONTH}-${DAY}-backup.sql`,
        })
    });
}