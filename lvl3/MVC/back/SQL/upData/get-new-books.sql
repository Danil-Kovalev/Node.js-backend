SELECT b.*, GROUP_CONCAT(a.name) AS author
FROM `booksV2` as b
JOIN `books-authors` as ba ON b.id=ba.idBook
JOIN `authors` as a ON a.id=ba.idAuthor
WHERE b.deleted=0
GROUP BY b.id
ORDER BY b.date DESC