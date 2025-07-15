// src/components/FirstSection.jsx
import React, { useState } from "react";
import Galka from "../images/galka.svg";
import BottomSvg from "../images/bottom.svg";
import ModalCodeEditor from "../components/ui/ModalCodeEditor"; // Ваш модальный компонент
import Quiz from "./ui/Quiz"; // Ваш компонент теста
// Если у вас есть компонент CodeEditor для практического задания, его тоже нужно импортировать
// import CodeEditorComponent from "./ui/CodeEditor"; 

import '../styles/FirstSection.css'; // Убедитесь, что путь правильный

function FirstSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // selectedLanguage теперь хранит объект { id, name } или null
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  // Состояние для отображения практического задания (CodeEditor)
  const [showCodeEditor, setShowCodeEditor] = useState(false);


  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleStartTraining = () => {
    // При нажатии "Тренироваться" открываем модалку для выбора языка
    setShowModal(true);
    // Сбрасываем показ теста/редактора, если они были открыты
    setShowQuiz(false);
    setShowCodeEditor(false);
  };

  // Этот обработчик теперь получает объект { id, name }
  const handleLanguageSelect = (langObject) => {
    setSelectedLanguage(langObject); // Сохраняем объект языка
    setShowModal(false); // Закрываем модальное окно выбора языка
    setShowQuiz(true);   // Показываем компонент Quiz (тест)
    // setShowCodeEditor(true); // Если нужно показывать CodeEditor после выбора языка, раскомментируйте
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // --- Данные для секций "Зачем подтверждать навыки?" и "Вопросы и ответы" ---
  const arrQuest = [
    "Найти слабые места, чтобы подтянуть их",
    "Показать работодателям, что вы профи",
    "Свериться с ожиданиями рынка",
    "Получить электронный сертификат и специальную отметку"
  ];

  const arrAskQuestions = [
    "Почему я могу доверять тестам?",
    "Почему пройти тест заново можно только через месяц?",
    "Если не сдам теорию и практику, это отразится в резюме?",
    "Мне не засчитали прохождение, пишут «система защиты зафиксировала подозрительную активность». Что делать?"
  ];

  const arrAsk = [
    "Тесты разработаны экспертами и регулярно обновляются для максимальной объективности.",
    "Ограничение в месяц помогает объективно оценивать прогресс и предотвращает злоупотребления.",
    "Нет, результаты тестов не отображаются в резюме, если вы не прошли их полностью.",
    "Обратитесь в поддержку: опишите ситуацию, и мы поможем разобраться."
  ];

  // Данные для практического задания (если будете использовать CodeEditor)
  const taskDescription = `
    Вы работаете в команде веб-платформы с прогнозом погоды. Вы работаете над модулем, который будет выдавать статистическую информацию о температуре за определённый период. На вход подаётся список из целых чисел. Ваша задача — определить, сколько чисел в этом списке являются положительными, сколько отрицательными и сколько из них равны нулю. Вам нужно вывести не сами числа, а их количество в каждой категории.
  `;
  const testCases = {
    input: "5 -2 0 7 8 -1",
    output: "выше нуля: 3, ниже нуля: 2, равна нулю: 1",
  };

  return (
    <div className='FirstSection'>
      <h1 className="confirm__nav">
        Подтверждайте навыки — <br /> их увидят работодатели
      </h1>
      <p className='paragraph'>
        Определите точки роста, заявите о себе работодателю и получите официальный сертификат
      </p>

      {/* Блок с карточками навыков */}
      <div className="box__wrapper__grid__roditel">
        <div className="box__wrapper__grid">
          {["C#", "Python", "JavaScript", "PHP", "HTML", "CSS", "LINUX", "JAVA"].map((skill, i) => (
            <div className="skill-card" key={i}>
              <span className="skill-card__icon">&lt;/&gt;</span>
              <span className="skill-card__title">{skill}</span>
              <button className="skill-card__btn">Подтвердить</button>
            </div>
          ))}
        </div>
      </div>

      {/* Блок "Зачем подтверждать навыки?" */}
      <h1 className='why'>Зачем подтверждать навыки?</h1>
      <div className="wrap__why__roditel">
        <div className="wrap__why">
          <div className="for__center">
            {arrQuest.map((quest, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img className='galka' src={Galka} alt="галочка" style={{ marginRight: '12px' }} />
                <p>{quest}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Блок "Потренируйтесь перед практическим заданием" */}
      <div className="trenirovka__box__roditel">
        <div className="trenirovka__box">
          <div className="row">
            <h1 className='h1__trening'>Потренируйтесь перед практическим заданием в редакторе кода</h1>
            <button className='start__trening' onClick={handleStartTraining}>Тренироваться</button>
          </div>
        </div>
      </div>

      {/* Блок "Вопросы и ответы" (Аккордеон) */}
      <h1 className='questions__and__ask'>Вопросы и ответы</h1>
      <div className="accordion">
        {arrAskQuestions.map((question, idx) => (
          <div
            className={`accordion__item ${openIndex === idx ? "open" : ""}`}
            key={idx}
          >
            <button
              className="accordion__question"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`answer-${idx}`}
              id={`question-${idx}`}
            >
              <span>{question}</span>
              <span className={`accordion__icon ${openIndex === idx ? "rotated" : ""}`}>
                <img src={BottomSvg} alt="" />
              </span>
            </button>
            <div
              id={`answer-${idx}`}
              role="region"
              aria-labelledby={`question-${idx}`}
              className="accordion__answer"
              style={{
                maxHeight: openIndex === idx ? "200px" : "0",
                padding: openIndex === idx ? "16px 24px" : "0 24px",
                opacity: openIndex === idx ? 1 : 0,
                transition: "max-height 0.45s cubic-bezier(.4,0,.2,1), opacity 0.3s, padding 0.3s"
              }}
            >
              {arrAsk[idx]}
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно выбора языка (всегда рендерится, но скрыто через isOpen) */}
      <ModalCodeEditor
        isOpen={showModal}
        onClose={handleCloseModal}
        onLanguageSelect={handleLanguageSelect}
      />

      {/* Отображение компонента Quiz (тест) */}
      {showQuiz && selectedLanguage && (
        <div style={{ marginTop: '40px' }}>
          <h2>Тест по языку: {selectedLanguage.name}</h2>
          {/* Передаем id выбранного языка в quizId */}
          <Quiz quizId={selectedLanguage.id} /> 
        </div>
      )}

    </div>
  );
}

export default FirstSection;
