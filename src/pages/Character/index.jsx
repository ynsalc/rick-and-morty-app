import React, { useState, useEffect } from "react";
import Sidebar from "components/Sidebar";
import CharacterCard from "components/CharacterCard";
import SearchBar from "components/SearchBar";
import Pagination from "components/Pagination";
import { charakterUrl } from "constants/serviceUrl";

const Character = () => {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [notResult, setNotResult] = useState(false);
  const [pageNumber, updatePageNumber] = useState(1);
  const [fetchedData, updateFetchedData] = useState([]);
  const { info, results } = fetchedData;

  let api = `${charakterUrl}/?page=${pageNumber}&name=${searchValue}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      if (data.hasOwnProperty("error")) {
        setNotResult(true);
      } else {
        setNotResult(false);
        updateFetchedData(data);
      }
    })();
  }, [api]);

  return (
    <div className="container mx-auto px-8">
      <SearchBar
        updatePageNumber={updatePageNumber}
        setSearch={setSearchValue}
      />
      <div className="flex justify-between">
        <Sidebar
          updateStatus={setStatus}
          updateGender={setGender}
          updateSpecies={setSpecies}
          updatePage={updatePageNumber}
        />
        <div className="ml-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
          {!notResult ? (
            results?.map((character) => (
              <CharacterCard character={character} key={character.id} />
            ))
          ) : (
            <h3 className="text-gray-700 text-xl">No Results.</h3>
          )}
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </div>
  );
};

export default Character;
