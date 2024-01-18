import { authorizer } from "./controllers.js";

export const DEFAULT_FILTER = 'new';
export const DEFAULT_OFFSET = 0;

export const CONFIG = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "dataBooks",
    password: ""
}

export const PATH_SQL = 'C:\\courses\\lvl3\\MVC\\SQL\\';

export const optionsAuth = {
    users: { 'admin': '1234' },
    challenge: true,
    authorizer: authorizer
}
