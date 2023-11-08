import {getData, addData, updateData, deleteData} from './functionCRUD'

export function getAction(action: any, dataUser?: string) {
    if (action === "getItem") {
        return getData();
    }
    else if (action === "deleteItem") {
        return deleteData(dataUser);
    }
    else if (action === "addItem") {
        return addData(dataUser);
    }
    else if (action === "editItem") {
        return updateData(dataUser);
    }
    else {
        return {"error": "uncorrected request"}
    }
}