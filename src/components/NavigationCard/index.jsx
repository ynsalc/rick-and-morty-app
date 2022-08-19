import React from "react";
import { Link } from "react-router-dom";

const NavigationCard = ({ image, text }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="home-item">
      <img className="w-full h-full object-fit" src={image} alt={text} />
      <div className="bg-cover">
        <Link to={`/${capitalizeFirstLetter(text)}`}>
          <p className="">{text}</p>
        </Link>
      </div>
    </div>
  );
};

export default NavigationCard;
