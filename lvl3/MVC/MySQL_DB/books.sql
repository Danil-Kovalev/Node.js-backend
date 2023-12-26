SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `dataBooks`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `year` int(11) NOT NULL,
  `pages` int(11) NOT NULL,
  `author` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `year`, `pages`, `author`) VALUES
(1, 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 'Лекции и практикум по программированию на Си++', 2003, 200, 'Андрій Богуславський'),
(2, 'Программирование на языке Go!', 'Лекції и практимум мовою Go', 2001, 300, 'Марк Саммерфільд'),
(3, 'Толковый словарь сетевых терминов и аббревиатур', 'Словар термінів і абревіатур', 2005, 100, 'М. Вільямс'),
(4, 'Python for Data Analysis', 'Глибоке пізнання пайтону для аналітики', 2010, 250, 'Уес Маккінні'),
(5, 'Thinking in Java (4th Edition)', 'Логіка в Java', 2009, 310, 'Брюс Еккель');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;