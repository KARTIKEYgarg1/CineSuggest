import React from "react";
import { Link } from "react-router-dom";

const Test = () => {
  return (
    <div id="oopss">
      <div id="error-text">
        <img
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
        />
        <span>404 PAGE</span>
        <p class="p-a">. The page you were looking for could not be found</p>
        <p class="p-b">... Go to Home page</p>
        <Link to="/" class="back">
          ... CineSuggest
        </Link>
      </div>
    </div>
  );
};

export default Test;
