import { authorizer } from "./controllers.js";
import path from "path";

let date = new Date();

export const YEAR = date.getFullYear(); //current year
export const MONTH = date.getMonth() + 1; //current month
export const DAY = date.getDate(); //current day

export const DEFAULT_FILTER = 'new'; //default filter value
export const DEFAULT_OFFSET = 0; //default offset value

export const PATH_SQL = path.resolve('../MVC/back/SQL/'); //path to sql files

/**
 * Options for basic auth
 */
export const optionsAuth = {
    users: { 'admin': '1234' },
    challenge: true,
    authorizer: authorizer
}
