import React, { useState, useEffect } from "react";
import Card from "components/Card";
import Pagination from "components/Pagination";
import { episodeUrl } from "constants/serviceUrl";

const Episode = () => {
  const [episodes, setEpisodes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [episodesInfo, setEpisodesInfo] = useState({});

  useEffect(() => {
    (async function () {
      const data = await fetch(`${episodeUrl}?page=${pageNumber}`).then((res) =>
        res.json()
      );
      setEpisodes(data.results);
      setEpisodesInfo(data.info);
    })();
  }, [pageNumber]);

  return (
    <div className="container mx-auto">
      <div className="ml-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
        {episodes.map((episode) => (
          <Card data={episode} key={episode.id} />
        ))}
      </div>
      <Pagination
        info={episodesInfo}
        pageNumber={pageNumber}
        updatePageNumber={setPageNumber}
      />
    </div>
  );
};

export default Episode;
