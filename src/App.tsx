import React, { useState } from 'react';
import { fetchQuestions } from './API';
import { level, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';
import { AllStyles, Wrapper } from './components/styles/App.styles';

const TOTAL_QUESTIONS = 50;

export type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);  
 
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    
    const newQuestions =  await fetchQuestions(
      TOTAL_QUESTIONS,
      level.EASY
    );
    

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev + 2);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev )=> [...prev, answerObject]);
    }    
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <AllStyles />
      <Wrapper>
        <h1>Trivia quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button
            className="start "
            onClick={startQuiz}
          >
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score:{score} / 100</p> : null}
        { loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers? userAnswers[number] : undefined }
            callback={checkAnswer}
          /> 
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
          <button
            className="next"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        )}
      </Wrapper>
    </>
  );
}

export default App;
