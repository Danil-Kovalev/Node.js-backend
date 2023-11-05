import express, { Express } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import session from 'express-session';
import FileStore from 'session-file-store';

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
    res.sendFile(path.resolve(dirname, 'data.json'));
  })
  .post((req: any, res: any) => {

  })
  .put((req: any, res: any) => {

  })
  .delete((req: any, res: any) => {

  })

app.listen(port, () => {
    console.log(`Server starts on port ${port}`);
});