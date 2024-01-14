import mysql from 'mysql2'
import { CONFIG } from '../back/src/constants'

export const clientDB = mysql.createConnection(CONFIG);