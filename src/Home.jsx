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
    <div className="w-[90%] md:w-80 mx-auto flex flex-col gap-4">
      <Header />
      <CategoryDropdown setter={(c) => setCategory(c)} category={category} />
      <NumberPicker number={numberOfQuestions} setter={setNumberOfQuestions} />
      <DifficultySelect difficulty={difficulty} setter={setDifficulty} />
      <button
        type="button"
        className="bg-slate-200 text-slate-500 px-4 py-2 rounded-sm cursor-pointer"
        onClick={StartQuiz}
      >
        Start Quiz
      </button>
      <footer className="absolute bottom-0 left-0 bg-slate-800 text-center text-slate-400 w-full p-2">
        By Shrey Nagda
      </footer>
    </div>
  );
};

export default Home;
