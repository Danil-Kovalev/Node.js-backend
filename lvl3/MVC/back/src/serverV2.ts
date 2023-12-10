import express, {Express, Request, Response} from 'express';
import * as path from 'path';

const app: Express = express();

const dirname: string = path.resolve();

const PORT: number = 3000;

app.use(express.static(dirname.concat('\\front\\all-books-page')));
app.use(express.static(dirname.concat('\\front\\book-page')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(dirname.concat('\\front\\all-books-page\\', 'books-page.html'));
});

app.get('/book/22', (req: Request, res: Response) => {
    res.sendFile(dirname.concat('\\front\\book-page\\', 'book-page.html'));
})

app.listen(PORT, () => {
    console.log(`Server V2 starts on port ${PORT}`);
});