import express, { Express } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import session from 'express-session';
import FileStore from 'session-file-store';
import {getData, addData, updateData, deleteData} from './functionCRUD'

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

app.get('/', (req: any, res: any) => {
    res.sendFile(path.resolve(dirname, 'front', 'index.html'));
});

app.route('/api/v1/items')
  .get((req: any, res: any) => {
    res.send(getData());
  })
  .post(jsonParser, (req: any, res: any) => {
    res.send(addData(req.body));
  })
  .put(jsonParser, (req: any, res: any) => {
    res.send(updateData(req.body));
  })
  .delete(jsonParser, (req: any, res: any) => {
    res.send(deleteData(req.body));
  })

app.listen(port, () => {
    console.log(`Server starts on port ${port}`);
});