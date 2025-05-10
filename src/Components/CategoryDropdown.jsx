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
        <div className="text-left w-full text-white pr-3">
          Select Category
        </div>
        <button
          type="button"
          className={`text-white cursor-pointer flex justify-between w-full p-3 border border-b ${showList ? "rounded-t-lg border-b-0 shadow-md" : "rounded-lg"}`}
          onClick={onClick}
        >
          <div className="text-ellipsis overflow-hidden whitespace-nowrap">
            {category.name}
          </div>
          <div className="flex items-center justify-center">
          {showList ? <FaTimes /> : <FaCaretDown />}
          </div>
        </button>
        {showList && (
          <ul className="absolute top-[75px] max-h-36 overflow-y-auto w-full z-10 bg-[#23232c] rounded-b-lg">
            {data &&
              data.map((_category) => (
                <li
                  key={_category.id}
                  onClick={() => {
                    setter(_category);
                    setShowList(false);
                  }}
                  className="text-left text-white px-1 py-2"
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
