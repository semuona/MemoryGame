import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Login from "./Login";
import Game from "./Game";
import Results from "./Results";

export default function Routers() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/game" element={<Game />} />
      <Route exact path="/results" element={<Results />} />
    </Routes>
  );
}
