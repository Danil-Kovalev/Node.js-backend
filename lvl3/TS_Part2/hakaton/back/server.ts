import express, {Request, Response} from 'express';

import * as path from 'path';

const dirname = path.resolve();
const port: number = 8080;

let app = express();

enum Click {
    Plus = "Plus",
    Minus = "Minus"
}

let counter = {
    [Click.Plus]: 0,
    [Click.Minus]: 0
}

app.use(express.static(path.resolve(dirname, 'front')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(dirname, 'front', 'index.html'));
});

app.put('/plus', (req: Request, res: Response) => {
    counter[Click.Plus]++
    console.log("Click plus: " + counter[Click.Plus])
    res.send({count: counter[Click.Plus]});
})

app.put('/minus', (req: Request, res: Response) => {
    counter[Click.Minus]++
    console.log("Click minus: " + counter[Click.Minus])
    res.send({count: counter[Click.Minus]})
})

app.listen(port, () => {
    console.log(`Server starts on port ${port}`);
});