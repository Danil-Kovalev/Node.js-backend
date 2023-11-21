import dataUsers from '../data.json';
import { Request, Response } from 'express';
import * as fs from 'fs';

export function getUser(login: any): number {
    let itemId: number = -1;
    itemId = dataUsers.users.findIndex(element => element.login === login)
    return itemId;
}

export function loginUser(req: Request, res: Response) {
    if (req.session.login) {
        res.send({"ok": true})
    }
    else if (dataUsers.users.find((element: any) => element.login === req.body.login && element.pass === req.body.pass)) {
        req.session.login = req.body.login;
        res.send({"ok": true});
    }
    else {
        res.send({"error": "not found"})
    }
}

export function logoutUser(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) throw Error;
        res.clearCookie('connect.sid');
        res.send({"ok": true});
    })
}

export function registerUser(req: Request, res: Response) {
    if(getUser(req.body.login) === -1) {
        req.session.login = req.body.login;
        let data = {"login": req.body.login, "pass": req.body.pass, "items": []}
        dataUsers.users.push(data);
        fs.writeFileSync('data.json', JSON.stringify(dataUsers));
        res.send({"ok": true});
    }
    else {
        res.send({"ok": false});
    }
}