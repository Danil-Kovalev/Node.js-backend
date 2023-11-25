import * as routers from './functionCRUD'
import * as auth from './checkUsers';

export function getAction(action: any) {
    switch(action) {
        case "getItems": return routers.getData;
        case "deleteItem": return routers.deleteData;
        case "createItem": return routers.addData;
        case "editItem": return routers.updateData;
        case "login": return auth.loginUser;
        case "logout": return auth.logoutUser;
        case "register": return auth.registerUser;
        default: return {"error": "uncorrected request"};
    }
}