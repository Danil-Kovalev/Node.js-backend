import * as cron from 'node-cron';
import mysqldump from 'mysqldump';
import { CONFIG } from '../config/config.js';
import { YEAR, MONTH, DAY } from '../src/constants.js';
import { getMarkedBook, deleteBook } from '../src/scripts.js';
import { RowDataPacket } from 'mysql2';

export async function deleteMarkBook() {
    let id = await getMarkedBook();
    
    cron.schedule('* * * * *', () => {
        console.log("Deleted book");
        id.map((el: RowDataPacket) => {
            deleteBook(Number(el.id));
        })
    });
}

export async function backupData() {
    cron.schedule('0 0 * * *', () => {
        mysqldump.default({
            connection: CONFIG,
            dumpToFile: `./back/backup/${YEAR}-${MONTH}-${DAY}-backup.sql`,
        })
    });
}