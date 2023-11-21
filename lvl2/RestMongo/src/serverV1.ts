import express, { Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

import session from 'express-session';
import FileStore from 'session-file-store';

import * as routers from './functionCRUD';
import * as auth from './checkUsers';

const app = express();
const dirname = path.resolve();
const port: number = 3005;
const FileStoreSession = FileStore(session);
const jsonParser = bodyParser.json();

app.use(express.static(path.resolve(dirname, 'front')));
app.use(
    session({
      store: new FileStoreSession({
        path: "./sessions"
      }),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        path: "/",
        maxAge: 1800000
      }
    })
);

declare module "express-session" {
  interface SessionData {
    login: string
  }
}

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(dirname, 'front', 'index.html'));
});

app.route('/api/v1/items')
  .get(routers.getData)
  .post(jsonParser, routers.addData)
  .put(jsonParser, routers.updateData)
  .delete(jsonParser, routers.deleteData)

app.post('/api/v1/login', jsonParser, auth.loginUser)
app.post('/api/v1/logout', auth.logoutUser)
app.post('/api/v1/register', jsonParser, auth.registerUser)

app.listen(port, () => {
  console.log(`Server V1 starts on port ${port}`);
});