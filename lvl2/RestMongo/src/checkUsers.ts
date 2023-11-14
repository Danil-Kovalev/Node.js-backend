import dataUsers from '../users.json';
import * as fs from 'fs';

export function loginUser(dataUser: any) {
    return dataUsers.users.find((element: any) => element.login === dataUser.login && element.pass === dataUser.pass);
}

export function registerUser(dataUser: any) {
    let result = false;
    if(!dataUsers.users.find((element: any) => element.login === dataUser.login)) {
        dataUsers.users.push(dataUser);
        fs.writeFileSync('users.json', JSON.stringify(dataUsers));
        result = true;
    }
    return result;
}