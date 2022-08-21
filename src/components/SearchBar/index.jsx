import React from "react";

const SearchBar = ({ updatePageNumber, setSearch }) => {
  return (
    <div className="rounded-lg mt-4 flex justify-between">
      <input
        className="p-4 rounded-lg lg:w-full md:w-auto sm:w-auto border border-slate-300"
        placeholder="Search..."
        type="text"
        onChange={(e) => {
          updatePageNumber(1);
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
