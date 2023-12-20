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
            { id: 3, title: 'Толковый словарь сетевых терминов и аббревиатур', author: 'М. Вильямс', description: 'Словар', year: 2005, pages: 100, event: false},
            { id: 4, title: 'Python for Data Analysis', author: 'Уэс Маккинни', description: 'Глибоке пізнання пайтону для аналітики', year: 2010, pages: 250, event: false},
            { id: 5, title: 'Thinking in Java (4th Edition)', author: 'Брюс Эккель', description: 'Логіка в Java', year: 2009, pages: 310, event: false},
            { id: 6, title: 'Introduction to Algorithms', author: 'Томас Кормен, Чарльз Лейзерсон, Рональд Ривест, Клиффорд Штайн', description: 'Вступ до алгоритмів', year: 2005, pages: 150, event: false},
            { id: 7, title: 'JavaScript Pocket Reference', author: 'Дэвид Флэнаган', description: 'Короткий довідник з Javascript', year: 2012, pages: 120, event: false},
            { id: 8, title: 'Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles', author: 'Гэри Маклин Холл', description: 'ООП С#', year: 2013, pages: 520, event: false},
            { id: 9, title: 'SQL: The Complete Reference', author: 'Джеймс Р. Грофф', description: 'Вивчення SQL', year: 2014, pages: 220, event: false},
            { id: 10, title: 'PHP and MySQL Web Development', author: 'Люк Веллинг', description: 'Вивчення SQL з PHP', year: 2015, pages: 430, event: false},
            { id: 11, title: 'Статистический анализ и визуализация данных с помощью R', author: 'Сергей Мастицкий', description: 'Аналіз даних за допомогою R', year: 2007, pages: 230, event: false},
            { id: 12, title: 'Computer Coding for Kid', author: 'Джон Вудкок', description: 'Посібник з кодування для дітей', year: 2016, pages: 380, event: false},
            { id: 13, title: 'Exploring Arduino: Tools and Techniques for Engineering Wizardry', author: 'Джереми Блум', description: 'Tools and Techniques for Engineering Wizardry', year: 2010, pages: 180, event: false},
            { id: 14, title: 'Программирование микроконтроллеров для начинающих и не только', author: 'А. Белов', description: 'Програмування фізичних пристроїв', year: 2005, pages: 680, event: false},
            { id: 15, title: 'The Internet of Things', author: 'Сэмюэл Грингард', description: 'Поняття інтернету', year: 2008, pages: 280, event: false},
            { id: 16, title: 'Sketching User Experiences: The Workbook', author: 'Сет Гринберг', description: 'Sketching User Experiences', year: 2009, pages: 240, event: false},
            { id: 17, title: 'InDesign CS6', author: 'Александр Сераков', description: 'Дизайн CS6', year: 2012, pages: 440, event: false},
            { id: 18, title: 'Адаптивный дизайн. Делаем сайты для любых устройств', author: 'Тим Кедлек', description: 'Адаптивний дизайн для сайтів', year: 2014, pages: 460, event: false},
            { id: 19, title: 'Android для разработчиков', author: 'Пол Дейтел, Харви Дейтел', description: 'Розуміння андроїду для розробників', year: 2018, pages: 326, event: false},
            { id: 20, title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Роберт Мартин', description: 'Поняття чистого та гарного коду', year: 2017, pages: 216, event: false},
            { id: 21, title: 'Swift Pocket Reference: Programming for iOS and OS X', author: 'Энтони Грей', description: 'Програмуавння на IOS та OS X', year: 2019, pages: 419, event: false},
            { id: 22, title: 'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence', author: 'Мартин Фаулер, Прамодкумар Дж. Садаладж', description: 'Поняття NoSQL', year: 2015, pages: 258, event: false},
            { id: 23, title: 'Head First Ruby', author: 'Джей Макгаврен', description: 'Вступ до Ruby', year: 2013, pages: 313, event: false},
            { id: 24, title: 'Practical Vim', author: 'Дрю Нейл', description: 'Практикування Vim', year: 2011, pages: 336, event: false}
        ],
        total: {
            amount: 24
        },
        filter: 'new',
        offset: 0
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
    console.log(req.query);
    let dataReady = {
        data: {
            books: dataBooks.data.books.slice(Number(req.query.offset), Number(req.query.limit) + Number(req.query.offset)),
            total: {
                amount: dataBooks.data.books.length
            },
            filter: String(req.query.filter) || 'new',
            offset: dataBooks.data.books.length - Number(req.query.limit)
        }
    }
    console.log(dataReady.data.books.length);
    
    res.send(dataReady)
})

app.get('/api/v1/book/:bookID', (req: Request, res: Response) => {
    res.send(dataBooks.data.books[Number(Object.values(req.params)) - 1]);
})

app.listen(PORT, () => {
    console.log(`Server V1 starts on port ${PORT}`);
});