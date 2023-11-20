import express, { Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

import session from 'express-session';
import FileStore from 'session-file-store';

import * as routers from './functionCRUD'
import { loginUser, registerUser } from './checkUsers';

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

app.post('/api/v1/login', jsonParser, (req: Request, res: Response) => {
  if (req.session.login) {
    res.send({"ok": true})
  }
  else if (loginUser(req.body).ok) {
    let loginUser = req.body;
    req.session.login = loginUser.login;
    res.send({"ok": true})
  }
  else {
    res.send({"error": "User not exist"})
  }
})

app.post('/api/v1/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) throw Error;
    res.clearCookie('connect.sid');
    res.send({"ok": true});
  })
})

app.post('/api/v1/register', jsonParser, (req: Request, res: Response) => {
  let resultRegister = registerUser(req.body);
  if (resultRegister.ok) {
    let loginUser = req.body;
    req.session.login = loginUser.login;
    res.send(resultRegister)
  }
  else {
    res.send({"error": "User exist"})
  }
})

app.listen(port, () => {
  console.log(`Server V1 starts on port ${port}`);
});