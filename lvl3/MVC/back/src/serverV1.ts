import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import * as router from './controllers';
import { optionsAuth } from './constants';
import basicAuth from 'express-basic-auth'

const app: Express = express();

const dirname: string = path.resolve();

const PORT: number = 3000;
const jsonParser = bodyParser.json();

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

app.route('/api/v1/book/:bookID').get(router.getBook);
app.route('/api/v1/books').get(router.getBooks)

app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});