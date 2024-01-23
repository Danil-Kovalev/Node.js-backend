CREATE TABLE `booksV1` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `year` int(11) NOT NULL,
  `pages` int(11) NOT NULL,
  `authors` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;