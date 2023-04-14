import React from "react";
import Spin from "./Spinner.gif";
const Spinner = () => {
  return (
    <img
      src={Spin}
      alt=""
      style={{ background: "rgba(128, 128, 128, 0.384)" }}
      className="position-absolute w-100 h-100 top-0 left-0"
    ></img>
  );
};

export default Spinner;
