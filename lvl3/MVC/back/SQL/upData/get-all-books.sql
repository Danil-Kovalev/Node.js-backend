SELECT b.*, GROUP_CONCAT(a.name) AS author
FROM `books` as b
JOIN `books-authors` as ba ON b.id=ba.idBook
JOIN `authors` as a ON a.id=ba.idAuthor
GROUP BY b.id