import React, { useState, useEffect } from 'react';
import questions from '../../data/data';
import './TestBody.css';

export default function TestBody() {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [visible, setVisible] = useState(true); 

  const ANIMATION_DURATION = 600; 
  const handleClick = (e) => {
    if (e.target.value === 'correct') {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }

 
    setVisible(false);

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(prev => prev + 1);
        setVisible(true);
      } else {
        setShowResult(true);
      }
    }, ANIMATION_DURATION);
  };

  return (
    <div className='container'>
      {!showResult ? (
        <div className={`test_body ${visible ? 'visible' : ''}`}>
          <h2 className="questionTitle">Simple Questions</h2>
          <h3 className="questionText">{questions[index].question}</h3>

          <div className="questionAnswer">
            <div className="questionBlocks">
              {questions[index].answers.slice(0, 2).map((answer, i) => (
                <button
                  key={i}
                  className="questionBtn"
                  value={answer.isCorrect ? 'correct' : 'negative'}
                  onClick={handleClick}
                >
                  {answer.text}
                </button>
              ))}
            </div>
            <div className="questionBlocks">
              {questions[index].answers.slice(2, 4).map((answer, i) => (
                <button
                  key={i + 2}
                  className="questionBtn"
                  value={answer.isCorrect ? 'correct' : 'negative'}
                  onClick={handleClick}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>

          <div className='questionLine'>
            <span
              className='greenLine'
              style={{ width: `${(correctCount / questions.length) * 100}%` }}
            ></span>
            <span
              className='redLine'
              style={{ width: `${(wrongCount / questions.length) * 100}%` }}
            ></span>
          </div>

          <div>
            <span>Правильно </span>
            <span className='correctAnswer'> {correctCount} </span>/ 
            <span className='unCorrectAnswer'> {wrongCount} </span> 
            <span>Неправильно</span>
          </div>
        </div>
      ) : (
        <div className='fs'>
          Ты славно потрудился, твой результат:
          <p>{correctCount} / {wrongCount}</p>
        </div>
      )}
    </div>
  );
}
