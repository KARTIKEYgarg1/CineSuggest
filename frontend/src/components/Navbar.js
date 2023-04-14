import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./logo.png";
function Navbar() {
  const navigate = useNavigate();

  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={
        isSolid
          ? window.innerWidth < 700
            ? "solid flex-column"
            : "solid"
          : "transparent"
      }
      onMouseEnter={() => setIsSolid(true)}
      onMouseLeave={() => (window.pageYOffset > 0 ? null : setIsSolid(false))}
    >
      <div className="left-nav">
        <a href="/">
          <img src={Logo} alt="Logo" />
          {isSolid && <span>CineSuggest</span>}
        </a>
      </div>
      <form
        className="right-nav mt-2"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/search/" + document.getElementById("query").value);
        }}
      >
        <div class="input-group mb-4 border rounded-pill p-1">
          <input
            autoComplete="false"
            type="search"
            placeholder="Search"
            aria-describedby="button-addon3"
            class="form-control bg-transparent border-0"
            id="query"
            required
          />
          <div class="input-group-append border-0">
            <button
              id="button-addon3"
              type="button"
              class="btn btn-link text-success"
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </nav>
  );
}

export default Navbar;
