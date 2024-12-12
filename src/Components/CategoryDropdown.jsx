import axios from "axios";
import React, { useEffect, useState } from "react";

import { FaCaretDown, FaTimes } from "react-icons/fa";

const CategoryDropdown = ({ setter, category }) => {
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    async function fetchCategory() {
      const res = await axios.get("https://opentdb.com/api_category.php");
      setData([
        { id: -1, name: "Any Category" },
        ...res.data["trivia_categories"],
      ]);
    }
    fetchCategory();
  }, []);

  function onClick() {
    setShowList(!showList);
  }

  return (
    <>
      <div className="text-center flex flex-col items-center justify-center cursor-pointer relative mx-auto w-full rounded-sm">
        <div className="text-left w-full text-gray-400 px-3">
          Select Category
        </div>
        <button
          type="button"
          className="text-slate-500 cursor-pointer flex justify-between w-full p-3 rounded-sm border-slate-200 border"
          onClick={onClick}
        >
          <div className="text-ellipsis overflow-hidden whitespace-nowrap">
            {category.name}
          </div>
          {showList ? <FaTimes /> : <FaCaretDown />}
        </button>
        {showList && (
          <ul className="absolute top-[75px] max-h-48 overflow-y-auto w-full z-10 bg-white">
            {data &&
              data.map((_category) => (
                <li
                  key={_category.id}
                  onClick={() => {
                    setter(_category);
                    setShowList(false);
                  }}
                  className="text-left m-2 bg-slate-100 text-gray-500 px-1 py-2 rounded-sm"
                >
                  {_category.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CategoryDropdown;
