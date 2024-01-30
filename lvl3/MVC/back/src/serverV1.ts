import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import basicAuth from 'express-basic-auth';
import multer from 'multer';

import * as router from './controllers.js';
import * as adminRouter from './adminController.js';
import { optionsAuth } from './constants.js';
import { backupData, deleteMarkBook } from '../cron/cron.js';
import { PATH_FOLDER } from './handlerFiles.js';
import { getNewID } from './scripts.js';

const app: Express = express();

const dirname: string = path.resolve();

const PORT: number = 3000;
const jsonParser = bodyParser.json();

await backupData();

await deleteMarkBook();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, PATH_FOLDER)
    },
    filename: async function (req, file, cb) {
      let id: number = await getNewID();
      cb(null, `${id}.jpg`)
    }
  })
  
const upload = multer({ storage: storage })

app.use(express.static(path.join(dirname, '/front')));
app.use(jsonParser)

app.set('view engine', 'ejs');
app.set('views', path.join(dirname, '/views'))

app.get('/', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/books-page.ejs'))
});

app.get('/admin', basicAuth(optionsAuth), (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/admin-page.ejs'))
})

app.get('/book/:bookID', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/book-page.ejs'))
})

app.get('/search', (req: Request, res: Response) => {
  res.render(path.join(dirname, '/views/search-page.ejs'))
});

app.route('/api/v1/book/:bookID').get(router.getBook);
app.route('/api/v1/book/click/:bookID').get(router.addClick);
app.route('/api/v1/books').get(router.getBooks);

app.route('/admin/api/v1/books').get(adminRouter.getBooks);

app.route('/admin/api/v1/book')
.delete(adminRouter.deleteBookAdmin)
.post(adminRouter.addBookAdmin)

app.post('/admin/api/v1/image', upload.single('new-img'), (req: Request, res: Response) => {
    res.send({"success": true})
})


app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});