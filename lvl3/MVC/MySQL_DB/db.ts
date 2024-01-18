import mysql, { Connection } from "mysql2/promise";
import { CONFIG } from '../back/src/constants.js'

export const db: Connection = await mysql.createConnection(CONFIG);