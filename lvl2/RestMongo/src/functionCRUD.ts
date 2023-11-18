import data from '../data.json';
import * as fs from 'fs';
import { MongoClient } from 'mongodb';

const dbUrl = "mongodb+srv://Danylo:passwordcourses12345@datauser.tqkhlcr.mongodb.net/";
const client = new MongoClient(dbUrl);
client.connect().then(res => console.log("Connected to database!"));
const db = client.db("myDatabase");
const collectionDb = db.collection("dataUsers");

export function getData() {
    collectionDb.countDocuments().then(result => {
        if (result == 0) collectionDb.insertMany(data.items);
    })
    return JSON.stringify(data);
}

export function addData(dataUser: any) {
    let newData = {
        "id": data.items.length + 1,
        "text": dataUser.text.toString(),
        "checked": true
    }
    data.items.push(newData);
    collectionDb.insertOne(newData);
    fs.writeFileSync('data.json', JSON.stringify(data));
    return JSON.stringify({
        "id": data.items.length
    });
}

export function updateData(dataUser: any) {
    let idUser = JSON.stringify(dataUser.id);
    let result = {
        "ok": false
    }
    collectionDb.updateOne({id: dataUser.id}, {$set: {text: dataUser.text.toString()}});
    data.items.forEach((element: any) => {
        if (element.id.toString() === idUser) {
            data.items[element.id - 1] = dataUser;
            fs.writeFileSync('data.json', JSON.stringify(data));
            result.ok = true;
            return JSON.stringify(result);
        }
    });
    return JSON.stringify(result);
}

export function deleteData(dataUser: any) {
    let result = {
        "ok": false
    }
    collectionDb.deleteOne({id: dataUser.id});
    data.items.forEach((element: any) => {
        if (element.id === dataUser.id) {
            data.items.splice(element.id - 1, 1);
            fs.writeFileSync('data.json', JSON.stringify(data));
            result.ok = true;
            return JSON.stringify(result);
        }
    })
    return JSON.stringify(result);
}