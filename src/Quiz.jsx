import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decode } from "html-entities";

import Loading from "./Components/Loading";
import Question from "./Components/Question";
import Result from "./Components/Result";

const Quiz = () => {
  const location = useLocation();
  const { url } = location.state;

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [time, setTime] = useState(0);
  const [playable, setPlayable] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  let interval;

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (savedQuestions && savedQuestions.length > 0) {
      setQuestionData(savedQuestions);
      setPlayable(true);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!loading && questionData.length !== 0) {
      interval = setInterval(() => {
        if (!playable) {
          clearInterval(interval);
        } else {
          setTime((prev) => prev + 1000);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading, playable]);

  async function fetchData() {
    try {
      const response = await axios.get(url);
      const data = response.data.results.map((item) => {
        const options = [...item.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * (options.length + 1));
        options.splice(randomIndex, 0, item.correct_answer);
        return { ...item, options };
      });

      localStorage.setItem("questions", JSON.stringify(data));
      setQuestionData(data);
      setPlayable(true);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch quiz data", err);
    }
  }

  function checkAnswer(option) {
    const current = {
      question: questionData[questionIndex]["question"],
      correct: questionData[questionIndex]["correct_answer"],
      options: questionData[questionIndex]["options"],
      selected: option,
    };

    setUserAnswers((prev) => [...prev, current]);

    if (questionIndex === questionData.length - 1) {
      clearInterval(interval);
      setPlayable(false);
      setShowResult(true);
      localStorage.removeItem("questions");
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }

  function replay() {
    localStorage.removeItem("questions");
    setQuestionIndex(0);
    setUserAnswers([]);
    setTime(0);
    setShowResult(false);
    setLoading(true);
    fetchData();
  }

  function home() {
    localStorage.removeItem("questions");
    navigate("/");
  }

  if (loading) return <Loading />;

  if (showResult) {
    return (
      <Result
        userAnswers={userAnswers}
        time={time}
        replay={replay}
        home={home}
      />
    );
  }

  return (
    <div className="h-svh w-full md:w-[500px] mx-auto flex flex-col justify-center items-center px-2 text-white">
      <div className="text-2xl font-bold absolute top-10  right-3 md:right-10 ">
        {time / 1000}
      </div>
      <div className="w-full flex items-center justify-between md:px-2 px-3 py-1 bg-white/40 text-[#23232c] rounded-md">
        {playable && (
          <div>{decode(questionData[questionIndex]["category"])}</div>
        )}
        <div>{`${questionIndex + 1} / ${questionData.length}`}</div>
      </div>
      {playable && (
        <Question
          question={questionData[questionIndex]["question"]}
          options={questionData[questionIndex]["options"]}
          checkAnswer={checkAnswer} 
        />
      )}
    </div>
  );
};

export default Quiz;
