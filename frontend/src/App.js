import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutMovie from "./pages/AboutMovie";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SentimentAnalyser from "./pages/SentimentAnalyser";
import Test from "./pages/Test";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home />></Route>
        <Route path="/analyse" element=<SentimentAnalyser />></Route>
        <Route path="/search/:query" element=<SearchResults />></Route>
        <Route path="/about/:id" element=<AboutMovie />></Route>
        <Route path="/*" element=<Test />></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
