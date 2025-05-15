import React, { useState, useEffect } from 'react';
import quizData from '../data/brainrotQuiz.json';

const BrainrotQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    setShowMessage(true);
    
    if (answer === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // 延迟加载下一题
    setTimeout(() => {
      if (currentQuestion + 1 < quizData.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowMessage(false);
      }
    }, 2000);
  };

  const currentQ = quizData.questions[currentQuestion];
  const options = ['A', 'B', 'C', 'D'];

  return (
    <div className="quiz-wrapper">
      <div className="quiz-slide" data-slide={currentQuestion + 1}>
        <div className="quiz-question">
          <div className="question-image">
            <img 
              src={currentQ.image} 
              alt={`Question ${currentQuestion + 1}`}
              className="question-img"
            />
          </div>
          <h3>{currentQ.question}</h3>
        </div>

        <div className="quiz-options">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === option
                  ? option === currentQ.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
            >
              <span className="option-letter">{options[index]}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {showMessage && (
          <div className={`quiz-message ${selectedAnswer === currentQ.correctAnswer ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : currentQ.explanation}
          </div>
        )}

        <div className="quiz-progress">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </div>
      </div>
    </div>
  );
};

export default BrainrotQuiz; 