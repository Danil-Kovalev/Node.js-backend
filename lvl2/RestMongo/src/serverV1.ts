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

app.use(express.static(path.resolve(dirname, 'front')));
app.use(bodyParser.json());
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
  .post((req: any, res: any) => {
    res.send(addData(req));
  })
  .put((req: any, res: any) => {
    res.send(updateData(JSON.parse(req)));
  })
  .delete((req: any, res: any) => {
    res.sende(deleteData(JSON.parse(req)));
  })

app.listen(port, () => {
    console.log(`Server starts on port ${port}`);
});