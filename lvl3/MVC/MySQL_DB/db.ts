import mysql, { Connection } from "mysql2/promise";
import { CONFIG } from '../back/config/config.js'

export const db: Connection = await mysql.createConnection(CONFIG);