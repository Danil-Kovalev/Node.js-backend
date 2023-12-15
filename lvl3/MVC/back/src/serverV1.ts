import express, {Express, Request, Response, json} from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

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

app.get('/book/:bookID', (req: Request, res: Response) => {
    // console.log("Params1, /book/:bookID --- " + Object.entries(req.params));
    res.render(path.join(dirname, '/views/book-page.ejs'))
})

app.get('/api/v1/books', (req: Request, res: Response) => {
    let dataBooks = {
        data: {
            books:
            [
                { id: 23, title: 'Программирование на языке Go!', author: 'Марк Саммерфильд' },
                { id: 25, title: 'Толковый словарь сетевых терминов и аббревиатур', author: 'М. Вильямс'}
            ],
            total: {
                amount: 2
            }
        }
    }
    res.send(dataBooks)
})

app.get('/api/v1/book/:bookID', (req: Request, res: Response) => {
//    console.log("Params3, /api/v1/book/:bookID --- " + Object.entries(req.params));
})

app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});