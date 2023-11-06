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
        "text": textUser,
        "checked": true
    }
    data.items.push(newData);
    fs.writeFileSync('data.json', JSON.stringify(data));
    return JSON.stringify(newData.id);
}

export function updateData(data: string) {

}

export function deleteData(data: string) {

}