import React, { useState } from "react";
import Header from "./Components/Header";
import CategoryDropdown from "./Components/CategoryDropdown";
import NumberPicker from "./Components/NumberPicker";
import DifficultySelect from "./Components/DifficultySelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState({ id: -1, name: "Any Category" });
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  function StartQuiz() {
    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}${
      category.id === -1 ? "" : `&category=${category.id}`
    }`;
    navigate("/quiz", { state: { url }, replace: true });
  }
  return (
    <div className="w-[90%] md:w-80 mx-auto min-h-svh flex flex-col justify-between py-4">
      <Header />
      <div className="flex flex-col gap-5">
      <CategoryDropdown setter={(c) => setCategory(c)} category={category} />
      <NumberPicker number={numberOfQuestions} setter={setNumberOfQuestions} />
      <DifficultySelect difficulty={difficulty} setter={setDifficulty} />
      </div>
      <button
        type="button"
        className="bg-slate-200 text-[#23232c] px-4 py-2 rounded-full cursor-pointer"
        onClick={StartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
