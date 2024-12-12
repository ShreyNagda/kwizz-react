import React, { useState } from "react";
import { decode } from "html-entities";

const Question = ({ question, options, checkAnswer }) => {
  //   const shuffledOptions = shuffleOptions(options);
  function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap the elements at i and randomIndex
      [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
    }
    return options;
  }
  return (
    <div className="my-2">
      <div className="text-lg px-3 font-medium md:text-2xl md:text-semibold ">
        {decode(question)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-3">
        {options.map((option, index) => (
          <div
            className="w-full text-center p-2 bg-red-50"
            onClick={() => checkAnswer(option)}
            key={index}
          >
            {decode(option)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;