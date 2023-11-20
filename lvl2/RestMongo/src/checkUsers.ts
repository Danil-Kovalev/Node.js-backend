import dataUsers from '../data.json';
import * as fs from 'fs';

export function getUser(login: any): number {
    let itemId: number = -1;
    itemId = dataUsers.users.findIndex(element => element.login === login)
    return itemId;
}

export function loginUser(dataUser: any) {
    if (dataUsers.users.find((element: any) => element.login === dataUser.login && element.pass === dataUser.pass)) return {"ok": true}
    else return {"ok": false}
}

export function registerUser(dataUser: any) {
    if(getUser(dataUser.login)) {
        let data = {"login": dataUser.login, "pass": dataUser.pass, "items": [{"id": 1, "text": "test", "checked": true}]}
        dataUsers.users.push(data);
        fs.writeFileSync('data.json', JSON.stringify(dataUsers));
        return {"ok": true};
    }
    return {"ok": false};
}