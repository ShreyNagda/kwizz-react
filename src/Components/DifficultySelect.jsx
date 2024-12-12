import React from "react";

const DifficultySelect = ({ difficulty, setter }) => {
  return (
    <div>
      <div className="px-3 text-gray-400">Select Difficulty Level</div>
      <div className="flex justify-between px-3 py-2 text-slate-500 transition-all">
        <span
          className={`flex gap-2 px-3 py-1 rounded-sm ${
            difficulty === "easy" ? "bg-red-200" : "bg-red-50"
          }`}
        >
          <input
            type="radio"
            name="difficulty"
            value="easy"
            id="easy"
            onChange={(ev) => setter(ev.target.value)}
            className="hidden"
          />
          <label htmlFor="easy">Easy</label>
        </span>
        <span
          className={`flex gap-2  px-3 py-1 rounded-sm ${
            difficulty === "medium" ? "bg-red-200" : "bg-red-50"
          }`}
        >
          <input
            type="radio"
            name="difficulty"
            value="medium"
            id="medium"
            onChange={(ev) => setter(ev.target.value)}
            className="hidden"
          />
          <label htmlFor="medium">Medium</label>
        </span>
        <span
          className={`flex gap-2  px-3 py-1 rounded-sm ${
            difficulty === "hard" ? "bg-red-200" : "bg-red-50"
          }`}
        >
          <input
            type="radio"
            name="difficulty"
            value="hard"
            id="hard"
            onChange={(ev) => setter(ev.target.value)}
            className="hidden"
          />
          <label htmlFor="hard">Hard</label>
        </span>
      </div>
    </div>
  );
};

export default DifficultySelect;
