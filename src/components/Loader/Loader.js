import React from "react";
import "./loader.scss";
import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
};

export default Loader;
