import React from "react";
import { Link } from "react-router-dom";
import * as classes from "./style.module.css";

export const Nav = () => {
  return (
    <React.Fragment>
      <div className={classes["nav-bar"]}>
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </div>
    </React.Fragment>
  );
};
