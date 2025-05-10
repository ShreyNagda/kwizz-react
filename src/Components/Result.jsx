import React from "react";
import { decode } from "html-entities";
import { MdOutlineRestartAlt } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const Result = ({ userAnswers, time, replay, home }) => {
  const score = userAnswers.filter(
    (ans) => ans.selected === ans.correct
  ).length;

  return (
    <div className="flex items-center justify-center flex-col text-white px-4 py-6">
      <div className="font-bold text-2xl mb-2">Quiz Completed</div>
      <div className="text-lg mb-1">⏱️ Time: {time / 1000} seconds</div>
      <div className="text-xl font-semibold mb-5">
        ✅ Score: {score} / {userAnswers.length}
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {userAnswers.map((item, index) => (
          <div key={index} className="p-4 rounded-md shadow-lg bg-white/10">

            <div className="font-semibold mb-2">
              {decode(item.question)}
            </div>
            <div className="grid grid-cols-1 gap-1">
              {item.options.map((option, i) => {
                const isCorrect = option === item.correct;
                const isSelected = option === item.selected;
                const color = isCorrect
                  ? "text-green-400"
                  : isSelected
                  ? "text-red-400"
                  : "text-gray-300";
                return (
                  <div key={i} className={`${color}`}>
                    {decode(option)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={replay}
          className="bg-white px-6 py-2 rounded-full text-[#23232c] flex gap-2 items-center"
        >
          <MdOutlineRestartAlt />Replay
        </button>
        <button
          onClick={home}
          className="bg-transparent border px-6 py-2 rounded-full text-white flex gap-2 items-center"
        >
          <FaHome/> Home
        </button>
      </div>
    </div>
  );
};

export default Result;
