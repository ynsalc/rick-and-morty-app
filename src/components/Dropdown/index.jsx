import React from "react";

const Dropdown = ({ selectSorted }) => {
  return (
    <>
      <select
        id="arrangement"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => selectSorted(e.target.value)}
      >
        <option value="asc">A {"->"} Z</option>
        <option value="desc">Z {"->"} A</option>
      </select>
    </>
  );
};

export default Dropdown;
