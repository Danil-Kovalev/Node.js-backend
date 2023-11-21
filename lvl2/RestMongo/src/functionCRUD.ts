import { Request, Response } from 'express';
import data from '../data.json';
import * as fs from 'fs';
// import { collectionDb } from './mongoDatabase';
import { getUser } from './checkUsers';

export function getData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    if (userItemId !== -1) {
        // collectionDb.countDocuments().then(result => {
        //     if (result == 0) collectionDb.insertMany(data.users);
        // })
        res.send(JSON.stringify(data.users[userItemId]));
    }
    else {
        res.send({"error": "forbidden"})
    }
}

export function addData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    let oldData = data.users[userItemId];
    let newItem = {
        id: data.users[userItemId].items.length + 1,
        text: req.body.text.toString(),
        checked: true
    }
    data.users[userItemId].items.push(newItem);
    // collectionDb.updateOne(oldData, {$set: {oldData: data.users[userItemId]}})
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.send(JSON.stringify({"id": data.users[userItemId].items.length}));
}

export function updateData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    let dataUser = req.body;
    let idUser = JSON.stringify(dataUser.id);
    let result = {
        "ok": false
    }
    // collectionDb.updateOne({id: dataUser.id}, {$set: {text: dataUser.text.toString()}});
    data.users[userItemId].items.forEach((element: any) => {
        if (element.id.toString() === idUser) {
            data.users[userItemId].items[element.id - 1] = dataUser;
            fs.writeFileSync('data.json', JSON.stringify(data));
            result.ok = true;
            return JSON.stringify(result);
        }
    });
    res.send(JSON.stringify(result));
}

export function deleteData(req: Request, res: Response) {
    let userItemId = getUser(req.session.login);
    let dataUser = req.body;
    let result = {
        "ok": false
    }
    // collectionDb.deleteOne({id: dataUser.id});
    data.users[userItemId].items.forEach((element: any) => {
        if (element.id === dataUser.id) {
            data.users[userItemId].items.splice(element.id - 1, 1);
            fs.writeFileSync('data.json', JSON.stringify(data));
            result.ok = true;
            return JSON.stringify(result);
        }
    })
    res.send(JSON.stringify(result));
}