import express, { Express, Request, Response, query } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import session from 'express-session';
import FileStore from 'session-file-store';
import { getAction } from './functionActions';

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
      resave: true,
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

app.post('/api/v2/router', jsonParser, (req: Request, res: Response) => {
  let resultAction: any;
  if (Object.keys(req.body).length !== 0) {
    resultAction = getAction(req.query.action, req.body);
    if (req.query.action === "register") {
      let loginUser = req.body;
      req.session.login = loginUser.login;
      if (resultAction.ok) res.send(resultAction)
      else res.send({"error": "User not exist"})
    }
    else if (req.query.action === "login") {
      if (resultAction.ok) res.send(resultAction)
      else res.send({"error": "User not exist"})
    }
  }
  else {
    if (req.query.action === "logout") {
      req.session.destroy((err) => {
        if (err) throw Error;
        res.clearCookie('connect.sid');
        res.send({"ok": true});
      })
    }
    else {
      res.send(getAction(req.query.action));
    }
  }
});

app.listen(port, () => {
    console.log(`Server V2 starts on port ${port}`);
});