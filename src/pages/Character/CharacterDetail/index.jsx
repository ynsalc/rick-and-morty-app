import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination";
import { Link, useParams } from "react-router-dom";
import { charakterUrl, episodeUrl } from "constants/serviceUrl";

const CharacterDetail = () => {
  const { id } = useParams();

  const [singleCharacter, setSingleCharacter] = useState({});
  const [episodeInfo, setEpisodeInfo] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [pageNumber, updatePageNumber] = useState(1);

  useEffect(() => {
    (async function () {
      const data = await fetch(
        `${charakterUrl}/${id}`
      ).then((res) => res.json());
      setSingleCharacter(data);
    })();
  }, [id]);

  useEffect(() => {
    (async function () {
      const data = await fetch(
        `${episodeUrl}?character=${id}&page=${pageNumber}`
      ).then((res) => res.json());
      setEpisodes(data.results);
      setEpisodeInfo(data.info);
    })();
  }, [id, pageNumber]);

  const { name, image, gender, location, species, status, origin, type } =
    singleCharacter;

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">Gender</p>{" "}
              <p className="text-gray-400">{gender}</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">Species</p>{" "}
              <p className="text-gray-400">{species}</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">Status</p>{" "}
              <p className="text-gray-400">{status}</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img
                src={image}
                className="rounded-full"
                viewBox="0 0 20 20"
                alt={name}
              />
            </div>{" "}
          </div>{" "}
          <div className="space-x-8 mt-32 md:mt-0">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">Location</p>
                <p className="text-gray-400">{location?.name}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Origin</p>
                <p className="text-gray-400">{origin?.name}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Type</p>
                <p className="text-gray-400">
                  {type?.length > 0 ? type : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{name}</h1>
        </div>
        <h3 className="text-gray-700 text-xl font-bold mt-4">Episodes</h3>
        <div className="mt-12 flex flex-col justify-center">
          {episodes.map((item) => (
            <Link to={`/episodes/${item.id}`} key={item.id} className="text-md text-gray-700">
              {item.name}
            </Link>
          ))}
        </div>
        <Pagination
          info={episodeInfo}
          pageNumber={pageNumber}
          updatePageNumber={updatePageNumber}
        />
      </div>
    </div>
  );
};

export default CharacterDetail;
