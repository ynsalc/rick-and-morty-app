import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination";
import LocationCard from "components/LocationCard";
import { locationUrl } from "constants/serviceUrl";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [locationInfo, setLocationInfo] = useState({});

  useEffect(() => {
    (async function () {
      const data = await fetch(`${locationUrl}?page=${pageNumber}`).then(
        (res) => res.json()
      );
      setLocations(data.results);
      setLocationInfo(data.info);
    })();
  }, [pageNumber]);

  return (
    <div className="container mx-auto">
      <div className="ml-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
        {locations.map((location) => (
          <LocationCard data={location} key={location.id} />
        ))}
      </div>
      <Pagination
        info={locationInfo}
        pageNumber={pageNumber}
        updatePageNumber={setPageNumber}
      />
    </div>
  );
};

export default Location;
