import express, {Express, Request, Response} from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

const app: Express = express();

const dirname: string = path.resolve();

const PORT: number = 3000;
const jsonParser = bodyParser.json();

app.use(express.static(dirname.concat('\\front\\all-books-page')));
app.use(express.static(dirname.concat('\\front\\book-page')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(dirname.concat('\\front\\all-books-page\\', 'books-page.html'));
});

app.get('/book/22', (req: Request, res: Response) => {
    res.sendFile(dirname.concat('\\front\\book-page\\', 'book-page.html'));
})

// app.get('/book/23', jsonParser, (req: Request, res: Response) => {
//     res.sendFile(dirname.concat('\\front\\book-page\\', 'book-page.html'));
// })

app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});