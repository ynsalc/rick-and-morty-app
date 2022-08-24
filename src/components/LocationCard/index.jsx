import React from "react";
import { Link } from "react-router-dom";

const LocationCard = ({ data }) => {
  return (
    <div className="group-relative">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <Link to={`/locations/${data.id}`} className="font-bold text-xl mb-2">
            {data.name}
          </Link>
          <p className="text-gray-700 text-base">{data.type}</p>
          <p className="text-gray-700 text-base">{data.dimension}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
