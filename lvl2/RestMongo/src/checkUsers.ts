import dataUsers from '../users.json';
import * as fs from 'fs';

export function getUser(login: string) {
    dataUsers.users.map((element: any) => {
        element.login === login
    })
}

export function loginUser(dataUser: any) {
    if (dataUsers.users.find((element: any) => element.login === dataUser.login && element.pass === dataUser.pass)) return {"ok": true}
    else return {"ok": false}
}

export function registerUser(dataUser: any) {
    let result = {
        "ok": false
    }
    if(!dataUsers.users.find((element: any) => element.login.toString() === dataUser.login.toString())) {
        dataUsers.users.push(dataUser);
        fs.writeFileSync('users.json', JSON.stringify(dataUsers));
        result.ok = true;
        return result;
    }
    return result;
}