import dataUsers from '../data.json';
import { Request, Response } from 'express';
import { collectionDb } from './mongoDatabase';
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
        if (err) {
            res.sendStatus(500).send({"error": "Session not find"})
            throw Error;
        }
        res.clearCookie('connect.sid');
        res.send({"ok": true});
    })
}

export async function registerUser(req: Request, res: Response) {
    if(getUser(req.body.login) === -1) {
        req.session.login = req.body.login;
        let newUser = {"login": req.body.login, "pass": req.body.pass, "items": []}
        dataUsers.users.push(newUser);
        await fs.writeFileSync('data.json', JSON.stringify(dataUsers));
        await collectionDb.insertOne({login: req.body.login, pass: req.body.pass, items: []});
        res.send({"ok": true});
    }
    else {
        res.sendStatus(404).send({"error": "User is exist"});
    }
}