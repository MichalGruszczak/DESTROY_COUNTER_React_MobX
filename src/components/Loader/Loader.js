import React from "react";
import "./loader.scss";
import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress color=" #7C887E" />
    </div>
  );
};

export default Loader;
