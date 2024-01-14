import { authorizer } from "./controllers";

export const DEFAULT_FILTER = 'new';
export const DEFAULT_OFFSET = 0;
export const CONFIG = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "dataBooks",
    password: ""
}

export const optionsAuth = {
    users: { 'admin': '123' },
    challenge: true,
    authorizer: authorizer
}
