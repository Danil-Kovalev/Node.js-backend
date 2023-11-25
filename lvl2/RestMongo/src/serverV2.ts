import express, { Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

import session from 'express-session';
import FileStore from 'session-file-store';
import cors from 'cors';

import { getAction } from './functionActions';

const app = express();
const dirname = path.resolve();
const port: number = 3005;
const FileStoreSession = FileStore(session);
const jsonParser = bodyParser.json();

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
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

app.post('/api/v2/router', jsonParser, (req: Request, res: Response) => {
  let resultQs = getAction(req.query.action);
  if (typeof resultQs === "function") {
    resultQs(req, res);
  }
  else {
    res.send(resultQs);
  }
});

app.listen(port, () => {
    console.log(`Server V2 starts on port ${port}`);
});