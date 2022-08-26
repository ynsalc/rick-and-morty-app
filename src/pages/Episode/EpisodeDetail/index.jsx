import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Dropdown from "components/Dropdown";
import { genderArr, speciesArr, statusArr } from "constants/staticArr";
import { readStorageItem, writeStorageItem } from "utils/storage";
import { episodeUrl } from "constants/serviceUrl";

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState({});
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [status, setUpdateStatus] = useState(statusArr);
  const [gender, setUpdateGender] = useState(genderArr);
  const [species, setUpdateSpecies] = useState(speciesArr);
  const [sorted, setSorted] = useState(null);
  const [notResult, setNotResult] = useState(false);
  let api = `${episodeUrl}/${id}`;
  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setEpisode(data);
      let characters = await Promise.all(
        data.characters.map((item) => {
          return fetch(item).then((res) => res.json());
        })
      );
      setEpisodeCharacters(
        characters.sort((a, b) => {
          const nameFirst = a.name.toUpperCase();
          const nameSecond = b.name.toUpperCase();

          if (nameFirst < nameSecond) {
            return -1;
          }
          if (nameFirst > nameSecond) {
            return 1;
          }
          return 0;
        })
      );
      writeStorageItem("episodeCharacter", characters);
    })();
  }, [api]);

  useEffect(() => {
    setStorageData(readStorageItem("episodeCharacter"));
  }, []);

  const changeStatus = (id) => {
    const statusStateList = status;
    const changeCheckedStatus = statusStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUpdateStatus(changeCheckedStatus);
  };

  const changeGender = (id) => {
    const genderStateList = gender;
    const changeCheckedGender = genderStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUpdateGender(changeCheckedGender);
  };

  const changeSpecies = (id) => {
    const speciesStateList = species;
    const changeCheckedSpecies = speciesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUpdateSpecies(changeCheckedSpecies);
  };

  const applyFilters = useCallback(() => {
    let updateCharacters = storageData;
    //Ascending Sort
    if (sorted === "asc") {
      updateCharacters = updateCharacters.sort((a, b) => {
        const nameFirst = a.name.toUpperCase();
        const nameSecond = b.name.toUpperCase();

        if (nameFirst < nameSecond) {
          return -1;
        }
        if (nameFirst > nameSecond) {
          return 1;
        }
        return 0;
      });
    }
    //Descending Sort
    if (sorted === "desc") {
      updateCharacters = updateCharacters
        .sort((a, b) => {
          const nameFirst = a.name.toUpperCase();
          const nameSecond = b.name.toUpperCase();

          if (nameFirst < nameSecond) {
            return -1;
          }
          if (nameFirst > nameSecond) {
            return 1;
          }
          return 0;
        })
        .reverse();
    }
    //Status Filter
    const statusChecked = status
      .filter((item) => item.checked)
      .map((item) => item.name);

    if (statusChecked.length > 0) {
      updateCharacters = updateCharacters.filter((sts) =>
        statusChecked.includes(sts.status)
      );
    }
    //Species Filter
    const speciesChecked = species
      .filter((item) => item.checked)
      .map((item) => item.name);

    if (speciesChecked.length > 0) {
      updateCharacters = updateCharacters.filter((sps) =>
        speciesChecked.includes(sps.species)
      );
    }
    //Gender Filter
    const genderChecked = gender
      .filter((item) => item.checked)
      .map((item) => item.name);

    if (genderChecked.length > 0) {
      updateCharacters = updateCharacters.filter((gnd) =>
        genderChecked.includes(gnd.gender)
      );
    }

    updateCharacters?.length > 0 ? setNotResult(false) : setNotResult(true);

    setEpisodeCharacters([...updateCharacters]);
  }, [status, species, gender, sorted, storageData]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="my-20 flex justify-between container mx-auto">
      {/* Sidebar Filter */}
      <div className="lg:w-auto md:w-auto sm:w-auto mr-5">
        <div className="lg:w-auto md:w-auto sm:w-auto rounded-lg">
          <h3 className="mb-4 font-semibold text-gray-900">Status</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
            {status.map((item) => (
              <li
                key={item.id}
                className="w-full rounded-t-lg border-b border-gray-200"
              >
                <div className="flex items-center pl-3">
                  <input
                    id={`${item.id}-status`}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => changeStatus(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`${item.id}-status`}
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900"
                  >
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mb-4 font-semibold text-gray-900 mt-4">Species</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
            {species.map((item) => (
              <li
                key={item.id}
                className="w-full rounded-t-lg border-b border-gray-200"
              >
                <div className="flex items-center pl-3">
                  <input
                    id={`${item.id}-species`}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => changeSpecies(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`${item.id}-species`}
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900"
                  >
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mb-4 font-semibold text-gray-900 mt-4">Gender</h3>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
            {gender.map((item) => (
              <li
                key={item.id}
                className="w-full rounded-t-lg border-b border-gray-200"
              >
                <div className="flex items-center pl-3">
                  <input
                    id={`${item.id}-gender`}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => changeGender(item.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={`${item.id}-gender`}
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900"
                  >
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Episode Detail */}
      <div className="lg:w-full">
        <div className="flex flex-row items-center flex-wrap">
          <div className="flex items-center bg-green-600 px-12 py-6 mr-10">
            <p className="my-2 text-2xl 2xl:text-6xl font-bold text-white">
              {episode.name}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col justify-between px-6 border-r border-green-600 first:pl-0 last:border-0">
              <span className="text-lg text-gray-800 font-medium">Episode</span>
              <span className="text-xl text-green-600 font-semibold">
                {episode.episode}
              </span>
            </div>
            <div className="flex flex-col justify-between px-6 border-r border-green-600 first:pl-0 last:border-0">
              <span className="text-lg text-gray-800 font-medium">
                Air Date
              </span>
              <span className="text-xl text-green-600 font-semibold">
                {episode.air_date}
              </span>
            </div>
          </div>
        </div>
        <div className="border p-12">
          <div className="my-4 pb-2 border-b border-gray-300 flex justify-between">
            <div className="text-xl 2xl:text-2xl font-bold">Characters</div>
            <div>
              <Dropdown selectSorted={setSorted} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 my-12">
            {!notResult ? episodeCharacters.map((char) => {
              return (
                <Link to={`/characters/${char.id}`} key={char.id}>
                  <div className="mb-4 flex flex-col items-center justify-center">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={char.image}
                      alt={char.name}
                    />
                    <p className="w-24 md:w-auto text-center mt-2 text-sm 2xl:text-base text-secondary hover:text-secondary-light font-bold truncate">
                      {char.name.slice(0, 20)}
                    </p>
                  </div>
                </Link>
              );
            }) : (
              <h3 className="text-gray-700 text-xl">No Results Found.</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
