import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ActorPhoto from "../components/GetActorPhotos";
import CircleProgressBar from "../components/CircleProgressBar";
import Review from "../components/Review";
import Spinner from "../components/Spinner";
const AboutMovie = () => {
  const { id } = useParams();
  const [fetched, setfetched] = useState(false);
  const [backdrop, setBackdrop] = useState("");
  const [demo2, setDemo2] = useState(false);
  const [popularity, setPopularity] = useState("");
  const [OL, setOL] = useState("");
  const [overview, setOverview] = useState("");
  // let demo2 = [];
  async function getMoviesFromApi() {
    try {
      if (!fetched) {
        let url = "https://www.omdbapi.com/?apikey=a82cd383&i=" + id;
        let response = await fetch(url);
        let responseD = await response.json();
        // setDemo2(AboutMovieDemo[0]);
        setDemo2(responseD);
        // console.log(responseD);
        setfetched(true);
      }
      // return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
  async function getBackDropFromApi() {
    fetch(
      `https://api.themoviedb.org/3/find/${id}?api_key=5a6224aafc694bf019086f12c8e1f458&external_source=imdb_id`
    )
      .then((response) => response.json())
      .then((data) => {
        const movie = data.movie_results[0];
        setBackdrop("https://image.tmdb.org/t/p/w500" + movie.backdrop_path);
        setOL(movie.original_language);
        setOverview(movie.overview);
        setPopularity(Math.round(movie.popularity) + "%");
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getMoviesFromApi();
    getBackDropFromApi();
  });
  return (
    <div>
      <Navbar />
      {fetched ? (
        <div>
          <div
            className="w-100"
            style={{
              height: "50vh",
              position: "relative",
              transform: "translateY(-80px)",
            }}
          >
            {backdrop.length > 0 ? (
              <div className="h-100 w-100">
                <img
                  src={backdrop}
                  alt=""
                  className="img-fluid h-100 w-100"
                ></img>
                <div
                  className="p-3"
                  style={{
                    transform: "translateY(-20vh)",
                  }}
                >
                  <div className="text-light">
                    <h1 style={{ fontFamily: "'Bebas Neue', cursive" }}>
                      {demo2.Title}
                    </h1>
                    <div>
                      {demo2.Genre.split(",").map(function (item, id) {
                        return (
                          <span className="border p-1 fw-bold mx-2 border-light">
                            {item}
                          </span>
                        );
                      })}
                    </div>
                    <div className="row gx-3">
                      <div
                        className="col rounded aboutBlocks"
                        style={{
                          backgroundColor: "var(--base)",
                          gridRowEnd: "auto",
                        }}
                      >
                        <i class="fa-solid fa-play"></i>
                      </div>
                      <div className="col rounded aboutBlocks">
                        {demo2.Runtime}
                      </div>
                      {window.innerWidth > 700 && (
                        <div className="col rounded aboutBlocks">
                          {demo2.BoxOffice}
                        </div>
                      )}
                      <div className="col rounded aboutBlocks">
                        {demo2.Year}
                      </div>
                      <div className="col rounded aboutBlocks">
                        {popularity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "null"
            )}
          </div>
          <div className="mb-5 p-3 ">
            <div className="row">
              <div className="col">
                <div className="col">
                  <h3>Leading Actors</h3>
                  <ActorPhoto list={demo2.Actors} />
                </div>
                <div className="row">
                  <div className="col-4">
                    <h3>Director</h3>
                    <ActorPhoto list={demo2.Director} />
                  </div>
                  <div className="col-6">
                    <h3>Writer</h3>
                    <ActorPhoto list={demo2.Writer} />
                  </div>
                </div>
              </div>
              <div className="col text-center">
                <div
                  style={{
                    boxShadow: "0px 0px 3vw var(--base)",
                    zIndex: 2,
                    position: "relative",
                  }}
                  className="row p-5 m-5 bg-light"
                >
                  <h3>Ratings</h3>
                  <div className="col-lg-5 col-5 p-3 mx-1">
                    <CircleProgressBar
                      percent={demo2.Ratings[0].Value.slice(
                        0,
                        demo2.Ratings[0].Value.indexOf("/")
                      )}
                    />
                    IMDB
                  </div>
                  <div className="col-lg-5 col-5 p-3 mx-1">
                    <CircleProgressBar
                      percent={demo2.Ratings[1].Value.slice(
                        0,
                        demo2.Ratings[1].Value.indexOf("%")
                      )}
                    />
                    RT
                  </div>
                  <div className="col-lg-5 col-5 p-3 mx-1">
                    <CircleProgressBar
                      percent={demo2.Ratings[2].Value.slice(
                        0,
                        demo2.Ratings[2].Value.indexOf("/")
                      )}
                    />
                    MediaCretic
                  </div>
                  <div className="col-lg-5 col-5 p-3 mx-1">
                    <h1 className="m-4">{OL}</h1>
                    Original Language
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container row">
            <img
              src={demo2.Poster}
              alt=""
              style={{ maxHeight: "70vh" }}
              className="col-4 col-md-6 col-lg-5 col-12"
            ></img>
            <div className="col-8 col-md-6 col-lg-7 col-12 pt-2">
              <p>
                <span className="text-primary">Overview: </span>
                <span className="text-secondary">{overview}</span>
              </p>
              {demo2.Awards && (
                <p>
                  <span className="text-primary">Awards: </span>
                  <span className="text-secondary">{demo2.Awards}</span>
                </p>
              )}
              <p>
                <span className="text-primary">Released: </span>
                <span className="text-secondary">{demo2.Released}</span>
              </p>
              <p>
                <span className="text-primary">Reviews: </span>
                <span className="text-secondary">
                  <Review name={demo2.Title} />
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AboutMovie;
