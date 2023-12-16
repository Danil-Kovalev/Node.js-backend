import express, {Express, Request, Response, json} from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

const app: Express = express();

const dirname: string = path.resolve();

const PORT: number = 3000;
const jsonParser = bodyParser.json();

let dataBooks = {
    data: {
        books:
        [
            { id: 1, title: 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', author: 'Андрей Богуславский',  description: 'Лекции и практикум по программированию на Си++', year: 2003, pages: 200, event: false},
            { id: 2, title: 'Программирование на языке Go!', author: 'Марк Саммерфильд', description: 'Лекції и практимум мовою Go', year: 2001, pages: 300, event: false },
            { id: 3, title: 'Толковый словарь сетевых терминов и аббревиатур', author: 'М. Вильямс', description: 'Словар', year: 2005, pages: 100, event: false}
        ],
        total: {
            amount: 3
        }
    }
}

app.use(express.static(path.join(dirname, '/front')));
app.use(jsonParser)

app.set('view engine', 'ejs');
app.set('views', path.join(dirname, '/views'))

app.get('/', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/books-page.ejs'))
});

app.get('/book/:bookID', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/book-page.ejs'))
})

app.get('/api/v1/books', (req: Request, res: Response) => {
    res.send(dataBooks)
})

app.get('/api/v1/book/:bookID', (req: Request, res: Response) => {
    res.send(dataBooks.data.books[Number(Object.values(req.params)) - 1]);
})

app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});