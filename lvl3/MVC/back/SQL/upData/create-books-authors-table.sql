CREATE TABLE 'books-authors' (
bookId INT NOT NULL,
authorId INT NOT NULL,
FOREIGN KEY (bookId) REFERENCES book(id),
FOREIGN KEY (authorId) REFERENCES author(id),
UNIQUE (bookId, authorId)
);