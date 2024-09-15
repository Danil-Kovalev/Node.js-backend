import mysql from "mysql2/promise";
import { CONFIG } from '../back/config/config.js';
export const db = await mysql.createConnection(CONFIG);
