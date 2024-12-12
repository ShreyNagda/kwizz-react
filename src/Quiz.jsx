import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";

import Loading from "./Components/Loading";
import Question from "./Components/Question";

const Quiz = () => {
  const location = useLocation();
  const { url } = location.state;
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  // const [score, setScore] = useState(0);
  const [scoreMap, setScoreMap] = useState([]);
  const [time, setTime] = useState(0);
  const [playable, setPlayable] = useState(false);
  let interval;

  //Timer using Interval
  useEffect(() => {
    if (!loading && questionData.length !== 0) {
      interval = setInterval(() => {
        if (!playable) {
          clearInterval(interval);
        } else {
          setTime((time) => time + 1000);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading, playable]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(url);
      let data = response.data.results;

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]["incorrect_answers"]);
        let randomIndex = Math.floor(
          Math.random() * data[i]["incorrect_answers"].length
        );
        let incorrect_answers = data[i]["incorrect_answers"];
        // console.log(`incorrect answers: ${incorrect_answers}`);
        let options = incorrect_answers;
        options.splice(randomIndex, 0, data[i]["correct_answer"]);

        data[i]["options"] = options;
      }
      setQuestionData(data);
      setLoading(false);
      setPlayable(true);
    } catch (err) {}
  }

  function incrementQuestionIndex() {
    if (questionIndex === questionData.length - 1) {
      clearInterval(interval);
      setPlayable(false);
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
  }

  function checkAnswer(option) {
    if (questionData[questionIndex]["correct_answer"] === option) {
      setScoreMap((prev) => [...prev, "✔️"]);
    } else {
      setScoreMap((prev) => [...prev, "❌"]);
    }
    incrementQuestionIndex();
  }

  function replay() {
    setQuestionIndex(0);
    setLoading(true);
    setTime(0);
    setScoreMap([]);
    fetchData();
    setTimeout(() => {
      setPlayable(true);
    }, 2000);
  }

  if (loading) {
    return <Loading />;
  }

  if (!playable) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="font-bold text-xl md:text-lg">Game Over</div>
        <div>{time / 1000} seconds</div>
        <div className="flex gap-5">
          {scoreMap.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <button
          type="button"
          className="mt-5 bg-red-50 px-10 py-3 rounded-sm"
          onClick={replay}
        >
          Replay
        </button>
      </div>
    );
  }

  return (
    <div className="px-2">
      <div className="text-xl text-right mt-5">{time / 1000}</div>
      <div className="flex justify-between px-2 mt-2">
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
