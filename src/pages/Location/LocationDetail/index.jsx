import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const LocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [locationCharacters, setLocationCharacters] = useState([]);
  let api = `https://rickandmortyapi.com/api/location/${id}`;
  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setLocation(data);
      let characters = await Promise.all(
        data.residents.map((item) => {
          return fetch(item).then((res) => res.json());
        })
      );
      setLocationCharacters(characters);
    })();
  }, [api]);

  return (
    <div className="my-20 flex flex-col container mx-auto">
      <div className="flex flex-row items-center flex-wrap">
        <div className="flex items-center bg-green-600 px-12 py-6 mr-10">
          <p className="my-2 text-2xl 2xl:text-6xl font-bold text-white">
            {location.name}
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col justify-between px-6 border-r border-green-600 first:pl-0 last:border-0">
            <span className="text-lg text-gray-800 font-medium">Type</span>
            <span className="text-xl text-green-600 font-semibold">
              {location.type}
            </span>
          </div>
          <div className="flex flex-col justify-between px-6 border-r border-green-600 first:pl-0 last:border-0">
            <span className="text-lg text-gray-800 font-medium">Dimension</span>
            <span className="text-xl text-green-600 font-semibold">
              {location.dimension}
            </span>
          </div>
        </div>
      </div>
      <div className="border border-secondary p-10">
        <div className="block my-4 pb-2 text-xl 2xl:text-2xl font-bold text-primary border-b border-gray-300">
          Characters
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 my-12">
          {locationCharacters.map((char) => {
            return (
              <Link to={`/characters/${char.id}`} key={char.id}>
                <div className="mb-4 flex flex-col items-center justify-center">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={char.image}
                    alt={char.name}
                  />
                  <p className="w-24 md:w-auto text-center mt-2 text-sm 2xl:text-base text-secondary hover:text-secondary-light font-bold truncate">
                    {char.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
