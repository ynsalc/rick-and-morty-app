import React from "react";
import Hero from "components/Hero";
import NavigationCard from "components/NavigationCard";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="w-5/6 mx-auto flex flex-col md:flex-row justify-center space-y-16 md:space-y-0 md:space-x-12 items-center py-10">
        <NavigationCard
          image="https://res.cloudinary.com/dfdwbrwrw/image/upload/v1660894657/characters_ey3wb7.jpg"
          text="Characters"
        />
        <NavigationCard
          image="https://res.cloudinary.com/dfdwbrwrw/image/upload/v1660894344/episode_i2yrmv.jpg"
          text="Episodes"
        />
        <NavigationCard
          image="https://res.cloudinary.com/dfdwbrwrw/image/upload/v1660894604/location_qqezje.jpg"
          text="Locations"
        />
      </div>
    </>
  );
};

export default Home;
