CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `year` int(11) NOT NULL,
  `pages` int(11) NOT NULL,
  `author` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;