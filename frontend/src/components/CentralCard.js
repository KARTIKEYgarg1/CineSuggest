import React from "react";
import { Link } from "react-router-dom";
// import aboutMovie from "./aboutMoviedemo.json";
const CentralCard = (props) => {
  console.log(props.aboutMov);
  return (
    <div
      style={{
        boxShadow: "0px 0px 10vw var(--base)",
        zIndex: 2,
        position: "relative",
      }}
      className="row p-5 m-5 bg-light"
    >
      <div className="col-12 col-md-3">
        <img src={props.aboutMov.Poster} alt="" className="img-fluid"></img>
      </div>
      <div className="col-12 col-md-9">
        <p>
          <span>
            <h2>{props.aboutMov.Title}</h2>
          </span>
          <span className="text-secondary">({props.aboutMov.Year})</span>
        </p>
        <p>
          <span className="text-primary">Plot: </span>
          <p className="text-justify">{props.aboutMov.Plot}</p>
        </p>
        <p>
          <span className="text-primary">Director: </span>
          <span> {props.aboutMov.Director}</span>
        </p>
        <p>
          <span className="text-primary">Writer: </span>
          <span> {props.aboutMov.Writer}</span>
        </p>
        <Link to={"/about/" + props.aboutMov.imdbID} class="wrapper">
          <div class="link_wrapper">
            <a href="/">View More</a>
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 268.832 268.832"
              >
                <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CentralCard;
