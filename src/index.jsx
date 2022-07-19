import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SearchBar from "./components/search-bar";
import WeatherModule from "./components/weather-module";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <>
    <h1>Simple Weather Application</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/:location" element={<WeatherModule />} />
      </Routes>
    </BrowserRouter>
  </>
  // </React.StrictMode>
);

