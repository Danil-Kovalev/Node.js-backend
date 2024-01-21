-- SELECT b.*, a.name as authorss FROM `books` as b
-- INNER JOIN `books-authors` as ba ON b.id=ba.idBook
-- INNER JOIN `authors` as a ON ba.idAuthor=a.id

SELECT b.*, GROUP_CONCAT(a.name) AS author
FROM `books` as b
JOIN `books-authors` as ba ON b.id = ba.idBook
JOIN `authors` as a ON a.id = ba.idAuthor
GROUP BY b.id