import React from "react";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import { useGlobalContext } from "./Context";
import Modal from "./Modal";
const App = () => {
  const {
    waiting,
    loading,
    questions,
    correct,
    index,
    checkAnswer,
    nextQuestion,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { question, correct_answer, incorrect_answers } = questions[index];
  const answers = [...incorrect_answers, correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => checkAnswer(answer === correct_answer)}
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          {" "}
          next question
        </button>
      </section>
    </main>
  );
};

export default App;
