-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2025 at 06:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projekt`
--
CREATE DATABASE IF NOT EXISTS `projekt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `projekt`;

-- --------------------------------------------------------

--
-- Table structure for table `isdone`
--

CREATE TABLE `isdone` (
  `quizz_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `isdone` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `isdone`
--

INSERT INTO `isdone` (`quizz_id`, `user_id`, `isdone`) VALUES
(1, 24, 1),
(2, 24, 1),
(23, 24, 1),
(31, 24, 1),
(1, 29, 1),
(31, 29, 1),
(33, 29, 1),
(31, 39, 1);

-- --------------------------------------------------------

--
-- Table structure for table `practice`
--

CREATE TABLE `practice` (
  `id` bigint(20) NOT NULL,
  `language_id` bigint(20) NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer1` varchar(255) DEFAULT NULL,
  `answer2` varchar(255) DEFAULT NULL,
  `answer3` varchar(255) DEFAULT NULL,
  `answer4` varchar(255) DEFAULT NULL,
  `correct_answer` int(11) DEFAULT NULL,
  `quiz_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `practice`
--

INSERT INTO `practice` (`id`, `language_id`, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `correct_answer`, `quiz_id`) VALUES
(1, 1, 'Mire használjuk a <title> elemet?', 'A weboldal címének beállítására', 'A főcím megjelenítésére az oldalon', 'Egy kép beszúrására', 'Egy link létrehozására', 0, 1),
(2, 1, 'Melyik HTML elem használható egy bekezdés létrehozására?', '<p>', '<h1>', '<div>', '<span>', 0, 1),
(3, 1, 'Milyen elem használható egy kép beillesztésére HTML-ben?', '<img>', '<image>', '<pic>', '<figure>', 0, 1),
(4, 1, 'Melyik attribútum segítségével adhatunk meg egy hivatkozást egy <a> elemben?', 'href', 'src', 'link', 'url', 0, 1),
(5, 1, 'Melyik elem használható egy táblázat létrehozására HTML-ben?', '<table>', '<tr>', '<td>', '<th>', 0, 1),
(6, 1, 'Melyik elem felelős egy lista létrehozásáért?', '<ul>', '<ol>', '<li>', '<list>', 0, 1),
(7, 1, 'Melyik elem használható űrlap létrehozására?', '<form>', '<input>', '<button>', '<textarea>', 0, 1),
(8, 1, 'Melyik attribútum határozza meg egy kép alternatív szövegét?', 'alt', 'src', 'title', 'description', 0, 1),
(9, 1, 'Melyik HTML elem jelöli a főcímet?', '<h1>', '<title>', '<header>', '<strong>', 0, 1),
(10, 1, 'Melyik elem felelős a lábjegyzet tartalmáért egy weboldalon?', '<footer>', '<bottom>', '<end>', '<last>', 0, 1),
(11, 2, 'Melyik kulcsszóval deklarálhatunk változót JavaScript-ben?', 'var', 'int', 'string', 'float', 0, 2),
(12, 2, 'Hogyan lehet egy függvényt meghívni JavaScript-ben?', 'functionName()', 'call functionName', 'invoke functionName', 'execute functionName', 0, 2),
(13, 2, 'Melyik operátor felelős az értékek összehasonlításáért és típusegyezés vizsgálatáért?', '===', '==', '!=', '!==', 0, 2),
(14, 2, 'Melyik metódussal lehet egy tömb utolsó elemét eltávolítani?', 'pop()', 'shift()', 'splice()', 'remove()', 0, 2),
(15, 2, 'Melyik metódussal lehet egy tömb első elemét eltávolítani?', 'shift()', 'pop()', 'splice()', 'remove()', 0, 2),
(16, 2, 'Melyik JavaScript ciklus fut legalább egyszer, mielőtt ellenőrzi a feltételt?', 'do...while', 'for', 'while', 'foreach', 0, 2),
(17, 2, 'Hogyan lehet egy elemhez eseménykezelőt hozzáadni JavaScript-ben?', 'element.addEventListener()', 'element.onEvent()', 'element.attachEvent()', 'element.setEvent()', 0, 2),
(18, 2, 'Melyik objektum felelős a konzolba való kiírásért JavaScript-ben?', 'console', 'log', 'print', 'write', 0, 2),
(19, 2, 'Melyik metódussal lehet karakterláncot kisbetűssé alakítani?', 'toLowerCase()', 'toLower()', 'lowerCase()', 'caseLower()', 0, 2),
(20, 2, 'Melyik metódussal lehet egy karakterláncot nagybetűssé alakítani?', 'toUpperCase()', 'toUpper()', 'upperCase()', 'caseUpper()', 0, 2),
(21, 3, 'Milyen CSS tulajdonságot használunk a szöveg színének megváltoztatására?', 'color', 'background-color', 'font-color', 'text-color', 0, 3),
(22, 3, 'Melyik CSS tulajdonság határozza meg a betűméretet?', 'font-size', 'text-size', 'size', 'font-weight', 0, 3),
(23, 3, 'Hogyan lehet félkövérre állítani egy szöveget CSS-ben?', 'font-weight: bold;', 'text-bold: true;', 'font-style: bold;', 'bold: yes;', 0, 3),
(24, 3, 'Melyik CSS tulajdonság befolyásolja a háttérszínt?', 'background-color', 'color', 'bgcolor', 'background', 0, 3),
(25, 3, 'Hogyan lehet egy elem szélességét beállítani CSS-ben?', 'width', 'size', 'length', 'max-width', 0, 3),
(26, 3, 'Melyik CSS tulajdonság állítja be az elem szegélyét?', 'border', 'outline', 'frame', 'box-border', 0, 3),
(27, 3, 'Melyik CSS tulajdonság határozza meg az elem külső margóját?', 'margin', 'padding', 'spacing', 'gap', 0, 3),
(28, 3, 'Melyik CSS tulajdonság állítja be a betűtípust?', 'font-family', 'font-style', 'text-font', 'font-weight', 0, 3),
(29, 3, 'Melyik CSS tulajdonság állítja be az elem belső térközét?', 'padding', 'margin', 'spacing', 'inner-space', 0, 3),
(30, 3, 'Melyik CSS tulajdonság határozza meg az elem átlátszóságát?', 'opacity', 'visibility', 'transparent', 'alpha', 0, 3),
(85, 4, 'Melyik kulcsszóval kell függvényt definiálni Pythonban?', 'def', 'function', 'func', 'define', 0, 23),
(86, 4, 'Hogyan készíthetünk megjegyzést Pythonban?', '# Ez egy megjegyzés', '// Ez egy megjegyzés', '/* Ez egy megjegyzés */', '-- Ez egy megjegyzés', 0, 23),
(87, 4, 'Melyik metódus távolítja el a lista utolsó elemét?', 'pop()', 'remove()', 'delete()', 'cut()', 0, 23),
(88, 4, 'Hogyan kezdődik egy for ciklus Pythonban?', 'for elem in lista:', 'for (elem in lista)', 'loop elem in lista:', 'foreach elem in lista:', 0, 23),
(89, 4, 'Melyik operátor hatványozásra szolgál?', '**', '^', '^^', 'pow()', 0, 23),
(90, 4, 'Melyik függvény ír ki szöveget a képernyőre?', 'print()', 'echo()', 'console.log()', 'output()', 0, 23),
(91, 4, 'Hogyan nyitunk meg fájlt olvasásra?', 'open(\"fajl.txt\", \"r\")', 'open(\"fajl.txt\", \"read\")', 'read(\"fajl.txt\")', 'file.open(\"fajl.txt\")', 0, 23),
(92, 4, 'Melyik adattípus tárol rendezett, megváltoztathatatlan elemeket?', 'tuple', 'list', 'array', 'set', 0, 23),
(93, 4, 'Mit csinál a range(5) függvény?', '0-tól 4-ig generál számokat', '1-től 5-ig generál számokat', '5 véletlen számot generál', '5-ös hosszú listát készít', 0, 23),
(94, 4, 'Melyik modul szükséges matematikai műveletekhez?', 'math', 'random', 'calc', 'numpy', 0, 23),
(95, 5, 'Melyik kulcsszóval hozunk létre osztályt Javaban?', 'class', 'Class', 'className', 'struct', 0, 24),
(96, 5, 'Mi a Java program belépési pontja?', 'public static void main(String[] args)', 'public static main(String[] args)', 'public void main(String[] args)', 'static void main(String[] args)', 0, 24),
(97, 5, 'Melyik adattípus tárol igaz/hamis értékeket?', 'boolean', 'bool', 'Boolean', 'bit', 0, 24),
(98, 5, 'Hogyan hozunk létre objektumot Javaban?', 'new Osztaly()', 'Osztaly.new()', 'create Osztaly()', 'Osztaly()', 0, 24),
(99, 5, 'Melyik kulcsszóval valósítjuk meg az öröklődést?', 'extends', 'inherits', 'implements', 'super', 0, 24),
(100, 5, 'Melyik nem primitív adattípus?', 'String', 'int', 'boolean', 'char', 0, 24),
(101, 5, 'Melyik operátor ellenőrzi, hogy két objektum ugyanaz?', '==', '===', 'equals()', 'compare()', 0, 24),
(102, 5, 'Melyik metódus ír ki szöveget a konzolra?', 'System.out.println()', 'console.log()', 'print()', 'echo()', 0, 24),
(103, 5, 'Melyik kulcsszó jelzi, hogy egy metódus nem ad vissza értéket?', 'void', 'null', 'none', 'empty', 0, 24),
(104, 5, 'Melyik nem vezérlési szerkezet?', 'loop', 'if', 'for', 'while', 0, 24),
(105, 8, 'Melyik SQL utasítás kérdez le adatokat?', 'SELECT', 'GET', 'RETRIEVE', 'FETCH', 0, 25),
(106, 8, 'Melyik záradék szűri a rekordokat?', 'WHERE', 'FILTER', 'IF', 'CONDITION', 0, 25),
(107, 8, 'Melyik kulcsszó rendez eredményeket?', 'ORDER BY', 'SORT BY', 'ARRANGE BY', 'GROUP BY', 0, 25),
(108, 8, 'Melyik függvény számolja a sorokat?', 'COUNT()', 'SUM()', 'TOTAL()', 'NUMBER()', 0, 25),
(109, 8, 'Melyik JOIN visszaadja mindkét tábla összes sorát?', 'FULL JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 0, 25),
(110, 8, 'Melyik utasítás szúr be új rekordot?', 'INSERT', 'ADD', 'CREATE', 'NEW', 0, 25),
(111, 8, 'Melyik utasítás módosít rekordokat?', 'UPDATE', 'MODIFY', 'CHANGE', 'ALTER', 0, 25),
(112, 8, 'Melyik utasítás töröl rekordokat?', 'DELETE', 'REMOVE', 'DROP', 'ERASE', 0, 25),
(113, 8, 'Melyik záradék csoportosít rekordokat?', 'GROUP BY', 'ORDER BY', 'SORT BY', 'COLLECT BY', 0, 25),
(114, 8, 'Melyik kulcsszó választ ki különböző értékeket?', 'DISTINCT', 'UNIQUE', 'DIFFERENT', 'SPECIAL', 0, 25),
(125, 2, '1+1', '1', '2', '3', '4', 1, 31),
(126, 2, '2+2', '1', '2', '3', '4', 3, 31),
(127, 3, '3+3', '6', '7', '8', '9', 0, 32),
(128, 3, '10', '10', '9', '8', '7', 0, 32),
(129, 8, 'A', 'A', 'b', 'c', 'd', 0, 33),
(130, 8, 'Ő', 'Ő', 'Q', 'W', 'E', 0, 33);

-- --------------------------------------------------------

--
-- Table structure for table `program_language`
--

CREATE TABLE `program_language` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_language`
--

INSERT INTO `program_language` (`id`, `name`, `description`) VALUES
(1, 'HTML', 'A markup language for structuring content on the web'),
(2, 'JavaScript', 'A programming language for dynamic web functionality'),
(3, 'CSS', 'A style sheet language used for styling web pages'),
(4, 'Python', 'A high-level programming language known for its readability and versatility'),
(5, 'Java', 'An object-oriented programming language designed to be platform-independent'),
(8, 'SQL', 'A domain-specific language used for managing and querying relational databases');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) NOT NULL,
  `language_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `rating` int(1) NOT NULL DEFAULT 0,
  `imgUrl` varchar(255) DEFAULT NULL,
  `numberOfRates` int(11) DEFAULT 0,
  `totalRates` int(11) DEFAULT 0,
  `createdby` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `language_id`, `title`, `description`, `rating`, `imgUrl`, `numberOfRates`, `totalRates`, `createdby`) VALUES
(1, 1, 'HTML Alapok', 'A quiz to test basic HTML knowledge', 0, NULL, 9, 35, NULL),
(2, 2, 'JavaScript Alapok', 'A quiz to test basic JavaScript knowledge', 0, NULL, 2, 7, NULL),
(3, 3, 'CSS Alapok', 'A quiz to test basic CSS knowledge', 0, NULL, 5, 20, NULL),
(23, 4, 'Python Alapok', 'Alapvető Python tudás teszteléséhez', 0, NULL, 0, 0, NULL),
(24, 5, 'Java Alapok', 'Alapvető Java tudás teszteléséhez', 0, NULL, 0, 0, NULL),
(25, 8, 'SQL Alapok', 'Alapvető SQL tudás teszteléséhez', 0, NULL, 0, 0, NULL),
(31, 2, 'egyszerű kérdés', 'összeadások', 0, NULL, 2, 6, 29),
(32, 3, 'Teszt 2', 'Teszt 2', 0, 'http://localhost:3000/uploads/1746381884523-626934733.webp', 0, 0, 29),
(33, 8, 'Teszt 3', 'Teszt 3', 0, 'http://localhost:3000/uploads/1746395844772-77373411.jpg', 1, 4, 29);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `teacher` tinyint(1) DEFAULT 0,
  `profileUrl` varchar(255) DEFAULT NULL,
  `isDark` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `teacher`, `profileUrl`, `isDark`) VALUES
(22, 'HegyiTibor', '$2b$10$PtlULEXhrQe190H6dNW9FudoC2GUV1.no4LusRWwkpCjs7hQBzE7K', 0, 'http://localhost:3000/uploads/1746381590708-470608421.jpg', 0),
(23, 'DénesRichárd', '$2b$10$cvt.Ixyw243.pmYczE1/i.m2OFrnemUjEF33S2jCKvC2Jbj1qsk3O', 0, NULL, 0),
(24, 'BáldiDávid', '$2b$10$T9.9sXZMcC3r4JhPWu4H4uFewM794jxRZIkfjh05AApBul73Ot9Te', 0, 'http://localhost:3000/uploads/1746381280706-756000746.webp', 0),
(28, 'Diák', '$2b$10$7iLzZlTtQjsON02bk5VR0OzlOGYA1Qz5IPJKasDNRCvOZF/vFqFzy', 0, NULL, 0),
(29, 'Tanár', '$2b$10$W5FUn8S1eeWHCf7EV45pNO8o8zzZhhhoKRwashSfXaKkxm5I87gne', 1, 'http://localhost:3000/uploads/1746381712514-518195920.jpg', 0),
(39, '12345678', '$2b$10$7Mdz54fo/RYKim5RuH68Duv2sub6Shd/X5LTOvuGwc7SmSM47AprS', 0, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `isdone`
--
ALTER TABLE `isdone`
  ADD UNIQUE KEY `unique_user_quiz` (`user_id`,`quizz_id`),
  ADD KEY `quizz_id` (`quizz_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `practice`
--
ALTER TABLE `practice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `program_language`
--
ALTER TABLE `program_language`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_id` (`language_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `practice`
--
ALTER TABLE `practice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `program_language`
--
ALTER TABLE `program_language`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `isdone`
--
ALTER TABLE `isdone`
  ADD CONSTRAINT `isdone_ibfk_1` FOREIGN KEY (`quizz_id`) REFERENCES `quizzes` (`id`),
  ADD CONSTRAINT `isdone_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
