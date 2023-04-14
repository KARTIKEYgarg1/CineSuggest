import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import aboutMove from "./aboutMoviedemo.json";
import { Link, useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams();
  const [fetched, setFetched] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!fetched) {
      let url = `https://www.omdbapi.com/?apikey=a82cd383&s=${query}&page=${page}`;
      getDat(url)
        .then((responseD) => {
          setResults(responseD);
          setFetched(true);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const getDat = async (url) => {
    let response = await fetch(url);
    let responseD = await response.json();
    console.log(responseD);
    return responseD;
  };
  const loadMore = () => {
    setPage(page + 1);
    let url = `https://www.omdbapi.com/?apikey=a82cd383&s=${query}&page=${
      page + 1
    }`;
    getDat(url)
      .then((responseD) => {
        if (responseD.Response.localeCompare("True") === 0) {
          setResults({
            Search: [...results.Search, ...responseD.Search],
            totalResults: responseD.totalResults,
            Response: responseD.Response,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>
          Your Searched For <span className="text-primary">{query}</span>
        </h1>
        <div className="row g-5">
          {fetched &&
            (results.Response.localeCompare("True") === 0 ? (
              results.Search.map((item, id) => {
                return (
                  <div className="col-5 col-md-3">
                    <Link
                      to={"/about/" + item.imdbID}
                      class="card"
                      id="searchResultCard"
                    >
                      <img
                        src={item.Poster}
                        class="card-img-top"
                        alt="..."
                        style={{ maxHeight: "40vh" }}
                      />
                      <div class="card-body">
                        <h5 class="card-title text-dark">{item.Title}</h5>
                        <p class="card-text">
                          <p>
                            <span className="text-primary">Year: </span>
                            <span className="text-dark">{item.Year} </span>
                          </p>
                          <p>
                            <span className="text-primary">Type: </span>
                            <span className="text-dark">{item.Type} </span>
                          </p>
                        </p>
                        {/* <a href="/" class="btn btn-primary">Go somewhere</a> */}
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div>No results</div>
            ))}
        </div>
        <div className="container-fluid d-flex justify-content-center mt-5 mb-3">
          <button onClick={loadMore} id="loadMore">
            Load More <i class="fa-solid fa-caret-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
