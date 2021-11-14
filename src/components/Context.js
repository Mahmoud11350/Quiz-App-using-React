import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    difficulty: "easy",
    category: "sports",
  });

  const table = {
    sports: 21,
    history: 23,
    politics: 24,
  };
  const { amount, difficulty, category } = quiz;
  const fetchQuestions = () => {
    setLoading(true);
    setWaiting(false);
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount,
          category: table[category],
          difficulty,
          type: "multiple",
        },
      })
      .then((res) => {
        if (res.data.results.length > 0) {
          setQuestions(res.data.results);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setError(true);
          setWaiting(true);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((old) => old + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((oldIndex) => oldIndex + 1);
    } else {
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setWaiting(true);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.velue;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        index,
        questions,
        isModalOpen,
        error,
        correct,
        checkAnswer,
        nextQuestion,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
        fetchQuestions,
      }}
    >
      {" "}
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
