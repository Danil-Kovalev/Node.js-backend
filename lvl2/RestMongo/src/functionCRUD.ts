import * as path from 'path';
import data from '../data.json';
import * as fs from 'fs';

const dirname = path.resolve();

export function getData() {
    return JSON.stringify(data);
}

export function addData(textUser: any) {
    let newData = {
        "id": data.items.length + 1,
        "text": textUser.text.toString(),
        "checked": true
    }
    data.items.push(newData);
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