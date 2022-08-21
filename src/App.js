import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Home from "pages/Home";
import Character from "pages/Character";
import Episode from "pages/Episode";
import Location from "pages/Location";
import CharacterDetail from "pages/CharacterDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Character />} />
        <Route path="/episodes" element={<Episode />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
