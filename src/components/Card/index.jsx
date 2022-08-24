import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="group-relative">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <Link to={`/episodes/${data.id}`} className="font-bold text-xl mb-2">
            {data.episode}
          </Link>
          <p className="text-gray-700 text-base">{data.name}</p>
          <p className="text-gray-700 text-base">{data.air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
