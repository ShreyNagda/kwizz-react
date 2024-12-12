import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const NumberPicker = ({ number, setter }) => {
  const increment = () => {
    setter(number + 1);
  };
  const decrement = () => {
    number > 5 && setter(number - 1);
  };
  return (
    <div>
      <div className="text-gray-400 px-3">Select Number of Questions</div>
      <div className="flex justify-between px-4 py-2 text-gray-500 border rounded-sm">
        <button type="button" onClick={decrement}>
          <FaMinus />
        </button>
        <div className="text-xl">{number}</div>
        <button type="button" onClick={increment}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default NumberPicker;
