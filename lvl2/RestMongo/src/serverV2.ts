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
      store: new FileStoreSession({}),
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    })
);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(dirname, 'front', 'index.html'));
});

app.post('/api/v2/router', jsonParser, (req: Request, res: Response) => {
    if (req.body !== null || undefined) {
        res.send(getAction(req.query.action, req.body));
    }
    else {
        res.send(getAction(req.query.action));
    }
})

app.listen(port, () => {
    console.log(`Server V2 starts on port ${port}`);
});