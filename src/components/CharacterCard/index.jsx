import React from "react";
import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {
  return (
    <div className="group-relative">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={character.image} alt={character.name} />
        <div className="px-6 py-4">
          <Link to={`/characters/${character.id}`} className="font-bold text-xl mb-2">{character.name}</Link>
          <p className="text-gray-700 text-base">Gender: {character.gender}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Status: {character.status}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Last location: {character.origin.name}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Species: {character.species}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
