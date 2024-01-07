import { authorizer } from "./controllers";

export const DEFAULT_FILTER = 'new';
export const DEFAULT_OFFSET = 0;

export const optionsAuth = {
    users: { 'admin': '123' },
    challenge: true,
    authorizer: authorizer
}
