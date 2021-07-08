import React from "react";
import * as classes from "./style.module.css";
import Movie from "./movie";

const MovieList = ({ moviesList, type }) => {
  return(
    <section >
    <div className= {classes["cards"]}>
    {moviesList.map((item) => {
      return (
        <Movie
          title={item.title}
          description={item.overview}
          rating={item.vote_average}
          imageUrl={item.backdrop_path}
          key={item.title}
        />
      );
    })}
  </div>
    </section>
  
)};
export default MovieList;
