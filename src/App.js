import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Home from "pages/Home";
import Character from "pages/Character";
import Episode from "pages/Episode";
import Location from "pages/Location";
import CharacterDetail from "pages/Character/CharacterDetail";
import EpisodeDetail from "pages/Episode/EpisodeDetail";
import LocationDetail from "pages/Location/LocationDetail";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Character />} />
        <Route path="/episodes" element={<Episode />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/episodes/:id" element={<EpisodeDetail />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
