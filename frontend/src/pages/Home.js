import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Camera from "../components/camera.gif";
import strArray from "../components/movieNames.json";
import CentralCard from "../components/CentralCard";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
// import aboutMovie from "./aboutMoviedemo.json";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dat, setDat] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [aboutMovie, setAboutMovie] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("searchTerm", searchTerm);
    try {
      const response = await fetch("/search", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const results = await getMoviesFromApi(data);
      console.log(results);
      setAboutMovie(results);
      setFetched(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getMoviesFromApi = async (tList) => {
    const results = [];
    const api_key = "a82cd383"; // replace with your own OMDB API key
    for (const imdb_t of tList) {
      const url = `http://www.omdbapi.com/?t=${imdb_t}&apikey=${api_key}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        results.push({
          Title: data.Title,
          Plot: data.Plot,
          Poster: data.Poster,
          Ratings: data.Ratings,
          Writer: data.Writer,
          Director: data.Director,
          Year: data.Year,
          imdbID: data.imdbID,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return results;
  };

  return (
    <div style={{ maxWidth: "100vw" }}>
      <Navbar />
      <div className="row">
        <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center p-5">
          <div>
            <h1>Cine Suggest -</h1>
            <h3>
              your guide to the{" "}
              <span className="text-primary">magic of movies</span>
            </h3>
          </div>
          <div
            className={
              dat.length > 0
                ? "p-1 bg-light shadow-sm mb-4  analyze"
                : "p-1 bg-light shadow-sm mb-4 rounded rounded-pill analyze"
            }
          >
            <form
              // autoComplete="off"
              className="input-group"
              onSubmit={(e) => {
                setFetched(false);
                setSubmit(false);
                handleSubmit(e);
                setSubmit(true);
                // window.location.href = "#centerCardHomePage";
              }}
            >
              <div className="input-group-prepend">
                <button
                  id="homePage-search"
                  type="submit"
                  className="btn btn-link text-primary"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="What're you searching for?"
                aria-describedby="homePage-search"
                id="homePage-searchBox"
                className="form-control border-0 bg-light"
                value={searchTerm}
                onChange={(e) => {
                  console.log(
                    strArray.filter((word) => word.includes(searchTerm))
                  );
                  setSearchTerm(e.target.value);
                  if (searchTerm.length > 3)
                    setDat(
                      strArray.filter((word) => word.includes(searchTerm))
                    );
                  else setDat([]);
                }}
              />
            </form>
            {dat.length > 0 && (
              <ul>
                {dat.map((item, id) => {
                  return (
                    <li
                      key={id}
                      onClick={() => {
                        setSearchTerm(item);
                        setDat([]);
                        document.getElementById("homePage-searchBox").focus();
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-6 col-sm-12" style={{ zIndex: -1 }}>
          <img src={Camera} alt="" className="img-fluid"></img>
        </div>
      </div>
      {submit &&
        (fetched ? (
          <div>
            <div id="centerCardHomePage">
              <CentralCard aboutMov={aboutMovie[0]} />
            </div>

            {window.innerWidth < 700 && (
              <h3 className="m-3">Some Recommended Movies:</h3>
            )}
            <div className="container d-flex" id="recommendedMovies">
              {window.innerWidth >= 700 && <h3>Some Recommended Movies:</h3>}

              {aboutMovie.slice(1).map(function (item, id) {
                return (
                  <Link
                    to={"/about/" + item.imdbID}
                    key={id}
                    className="p-3 m-5 card"
                    style={{
                      minWidth: "500px",
                    }}
                  >
                    <div className="row">
                      <div className="col-4">
                        <img
                          className="card-img-top"
                          src={item.Poster}
                          alt=""
                        ></img>
                      </div>
                      <div className="col-8">
                        <h5 class="card-title fw-bold">{item.Title}</h5>
                        <span className="text-secondary fw-bold">
                          {item.Genre}
                        </span>
                        <p className="text-secondary fw-light mt-3 text-justify w-100">
                          {item.Plot}
                        </p>
                        <p className="mt-4">
                          <span className="solid rounded rounded-pill p-3 me-2 ">
                            <i
                              class="fa-brands fa-imdb me-2 fs-3 mt-2"
                              style={{
                                color: "#000000",
                                backgroundColor: "yellow",
                              }}
                            ></i>
                            <span>{item.Ratings[0].Value}</span>
                          </span>
                          <span className="solid rounded rounded-pill p-3 ">
                            <i
                              class="fa-solid fa-heart me-2 fs-3 mt-2"
                              style={{ color: "#ff0000" }}
                            ></i>
                            <span>{item.Ratings[1].Value}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <Spinner />
        ))}
    </div>
  );
};

export default Home;
