import { Request, Response } from 'express';
import data from '../data.json';
import * as fs from 'fs';
import { collectionDb } from './mongoDatabase';
import { getUser } from './checkUsers';

export function getData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    if (userItemId !== -1) {
        res.send(JSON.stringify(data.users[userItemId]));
    }
    else {
        res.send({"error": "forbidden"})
    }
}

export async function addData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    let newItem = {
        id: data.users[userItemId].items.length + 1,
        text: req.body.text.toString(),
        checked: true
    }
    data.users[userItemId].items.push(newItem);
    await fs.writeFileSync('data.json', JSON.stringify(data));
    await collectionDb.updateOne({login: req.session.login}, {$push: {items: newItem}});
    res.send(JSON.stringify({"id": data.users[userItemId].items.length}));
}

export function updateData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    let dataUser = req.body;
    let idUser = JSON.stringify(dataUser.id);
    let result = {"ok": false}
    data.users[userItemId].items.forEach(async (element: any) => {
        if (element.id.toString() === idUser) {
            data.users[userItemId].items[element.id - 1] = dataUser;
            await fs.writeFileSync('data.json', JSON.stringify(data));
            await collectionDb.updateOne({login: req.session.login, "items.id": dataUser.id}, {$set: {"items.$.text": dataUser.text}});
            result.ok = true;
        }
    });
    res.send(JSON.stringify(result));
}

export async function deleteData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    let dataUser = req.body;
    let result = {"ok": false};
    data.users[userItemId].items.forEach(async (element: any) => {
        if (element.id === dataUser.id) {
            data.users[userItemId].items.splice(element.id - 1, 1);
            await fs.writeFileSync('data.json', JSON.stringify(data));
            result.ok = true;
        }
    })
    await collectionDb.updateOne({login: req.session.login, "items.id": dataUser.id}, {$pull: {items: {id: dataUser.id}}});
    res.send(JSON.stringify(result));
}