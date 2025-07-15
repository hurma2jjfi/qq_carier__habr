-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 15 2025 г., 19:47
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `service`
--

-- --------------------------------------------------------

--
-- Структура таблицы `answers`
--

CREATE TABLE `answers` (
  `id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `is_correct`) VALUES
(76, 1, 'Протокол передачи гипертекста', 1),
(77, 1, 'Язык программирования', 0),
(78, 1, 'База данных', 0),
(79, 1, 'Веб-сервер', 0),
(80, 1, 'Операционная система', 0),
(81, 2, 'Язык программирования для веба', 1),
(82, 2, 'База данных', 0),
(83, 2, 'Система контроля версий', 0),
(84, 2, 'Веб-сервер', 0),
(85, 2, 'Операционная система', 0),
(86, 3, 'Организованное хранилище данных', 1),
(87, 3, 'Язык программирования', 0),
(88, 3, 'Веб-браузер', 0),
(89, 3, 'Операционная система', 0),
(90, 3, 'Протокол передачи данных', 0),
(91, 4, 'Архитектурный стиль взаимодействия компонентов', 1),
(92, 4, 'Язык программирования', 0),
(93, 4, 'Тип базы данных', 0),
(94, 4, 'Протокол передачи данных', 0),
(95, 4, 'Операционная система', 0),
(96, 5, 'Каскадные таблицы стилей', 1),
(97, 5, 'Язык программирования', 0),
(98, 5, 'Фреймворк', 0),
(99, 5, 'База данных', 0),
(100, 5, 'Система контроля версий', 0),
(101, 6, 'Система контроля версий', 1),
(102, 6, 'Язык программирования', 0),
(103, 6, 'Веб-сервер', 0),
(104, 6, 'База данных', 0),
(105, 6, 'Операционная система', 0),
(106, 7, 'Формат обмена данными', 1),
(107, 7, 'Язык программирования', 0),
(108, 7, 'Веб-браузер', 0),
(109, 7, 'Фреймворк', 0),
(110, 7, 'Система контроля версий', 0),
(111, 8, 'JavaScript библиотека для построения UI', 1),
(112, 8, 'Язык программирования', 0),
(113, 8, 'Фреймворк', 0),
(114, 8, 'Веб-сервер', 0),
(115, 8, 'База данных', 0),
(116, 9, 'Язык запросов к базам данных', 1),
(117, 9, 'Язык программирования', 0),
(118, 9, 'Протокол передачи данных', 0),
(119, 9, 'Фреймворк', 0),
(120, 9, 'Операционная система', 0),
(121, 10, 'Среда выполнения JavaScript вне браузера', 1),
(122, 10, 'Язык программирования', 0),
(123, 10, 'Фреймворк', 0),
(124, 10, 'Веб-сервер', 0),
(125, 10, 'База данных', 0),
(126, 11, 'Ошибка: страница не найдена', 1),
(127, 11, 'Успешный ответ сервера', 0),
(128, 11, 'Ошибка сервера', 0),
(129, 11, 'Переадресация', 0),
(130, 11, 'Ошибка клиента', 0),
(131, 12, 'Объектная модель документа', 1),
(132, 12, 'Язык программирования', 0),
(133, 12, 'Фреймворк', 0),
(134, 12, 'Система контроля версий', 0),
(135, 12, 'Протокол передачи данных', 0),
(136, 13, 'Интерфейс программирования приложения', 1),
(137, 13, 'Язык программирования', 0),
(138, 13, 'Фреймворк', 0),
(139, 13, 'Веб-сервер', 0),
(140, 13, 'База данных', 0),
(141, 14, 'Асинхронный JavaScript и XML', 1),
(142, 14, 'Язык программирования', 0),
(143, 14, 'Фреймворк', 0),
(144, 14, 'Веб-сервер', 0),
(145, 14, 'База данных', 0),
(146, 15, 'Программа, обрабатывающая запросы клиентов в сети', 1),
(147, 15, 'Язык программирования', 0),
(148, 15, 'База данных', 0),
(149, 15, 'Операционная система', 0),
(150, 15, 'Протокол передачи данных', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `languages`
--

CREATE TABLE `languages` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `languages`
--

INSERT INTO `languages` (`id`, `name`) VALUES
(3, 'C#'),
(4, 'Java'),
(2, 'JavaScript'),
(5, 'PHP'),
(1, 'Python');

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE `questions` (
  `id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `question_text` text NOT NULL,
  `question_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `question_text`, `question_order`) VALUES
(1, 1, 'Вопрос 1: Что такое HTTP?', 1),
(2, 1, 'Вопрос 2: Что такое JavaScript?', 2),
(3, 1, 'Вопрос 3: Что такое база данных?', 3),
(4, 1, 'Вопрос 4: Что такое REST API?', 4),
(5, 1, 'Вопрос 5: Что такое CSS?', 5),
(6, 1, 'Вопрос 6: Что такое Git?', 6),
(7, 1, 'Вопрос 7: Что такое JSON?', 7),
(8, 1, 'Вопрос 8: Что такое React?', 8),
(9, 1, 'Вопрос 9: Что такое SQL?', 9),
(10, 1, 'Вопрос 10: Что такое Node.js?', 10),
(11, 1, 'Вопрос 11: Что такое HTTP статус 404?', 11),
(12, 1, 'Вопрос 12: Что такое DOM?', 12),
(13, 1, 'Вопрос 13: Что такое API?', 13),
(14, 1, 'Вопрос 14: Что такое AJAX?', 14),
(15, 1, 'Вопрос 15: Что такое веб-сервер?', 15);

-- --------------------------------------------------------

--
-- Структура таблицы `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `duration_minutes` int NOT NULL DEFAULT '20',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `description`, `duration_minutes`, `created_at`, `updated_at`) VALUES
(1, 'Тест на IT-компетенции', 'Тест из 15 вопросов с 5 вариантами ответов на время 20 минут', 20, '2025-07-06 16:41:15', '2025-07-06 16:41:15');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `phone`, `password`, `created_at`) VALUES
(1, '9094353443', '$2b$10$SQCBDy.262rAkpG6H0vrYeYeT3olOU5yDixN8PJThCDnrivj4.QlG', '2025-07-06 10:35:49'),
(2, 'sanechekslab', '$2b$10$qGPRyY1uNBsyP2AJ5vOlfuDFVuqkfEUZo2AnNqV4ByihMQ7tGYK1.', '2025-07-06 10:36:53'),
(5, '+79093939393', '$2b$10$yhtUhO0l/TqH.lsJcT4rNOx7X/7oiv7uEYkDN7Mx179QzhF3.8SWe', '2025-07-06 10:47:27'),
(6, '+79093730622', '$2b$10$ts6DxYfz3yOoSlWHK2nhPOyLbLS8cW1jK7.EaJpOrzOhrrp5oDdta', '2025-07-06 11:07:43'),
(7, '+77909373062', '$2b$10$XWxa12gGLefNj2U97dsIEeyTvfZwI4ZNbIpilNjyzYNR8QLCTEnLO', '2025-07-06 11:12:21'),
(8, '+77909373061', '$2b$10$g784yzIjSw35yzTi18NVdOkLQJ9oH4tJ6SFN8eReZe6JDiYKqjofm', '2025-07-06 11:38:39'),
(9, '+79029222222', '$2b$10$aM0EbN7OL4dFQqQ1jJh6BOQ3qtTLLP0e3FhknhqSQAzju9BFOyiyC', '2025-07-06 11:56:35'),
(10, '+79093730624', '$2b$10$zoD1fG0UFoCnc1sXp9x7FuHYt8hwHk2tywwlttcVBYcy0WXxsXWhG', '2025-07-12 04:49:45');

-- --------------------------------------------------------

--
-- Структура таблицы `user_answers`
--

CREATE TABLE `user_answers` (
  `id` int NOT NULL,
  `submission_id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `user_quiz_submissions`
--

CREATE TABLE `user_quiz_submissions` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `started_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finished_at` datetime DEFAULT NULL,
  `score` int DEFAULT '0',
  `status` enum('В ожидании','Успешно','Время вышло') DEFAULT 'В ожидании'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Индексы таблицы `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Индексы таблицы `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Индексы таблицы `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submission_id` (`submission_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Индексы таблицы `user_quiz_submissions`
--
ALTER TABLE `user_quiz_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT для таблицы `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `user_quiz_submissions`
--
ALTER TABLE `user_quiz_submissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `user_quiz_submissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_quiz_submissions`
--
ALTER TABLE `user_quiz_submissions`
  ADD CONSTRAINT `user_quiz_submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_quiz_submissions_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
