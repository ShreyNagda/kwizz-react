import React from "react";

const DifficultySelect = ({ difficulty, setter }) => {
  const chipStyle = (value, difficulty) => {
    if(difficulty === value){
      return "bg-white";
    }else{
      return "bg-transparent border border-white text-white";
    }
  }
  return (
    <div>
      <div className="text-white">Select Difficulty Level</div>
      <div className="flex justify-between py-1 text-slate-500 transition-all">
        <span
          className={`flex gap-2 px-6 py-2 rounded-full ${
            chipStyle("easy",difficulty )
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
          className={`flex gap-2  px-6 py-2 rounded-full ${
            chipStyle("medium",difficulty )
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
          className={`flex gap-2  px-6 py-2 rounded-full ${
            chipStyle("hard", difficulty)
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
