import { useEffect, useState } from "react";
import Movies from "../movies";

export const Favourites = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let moviesList = JSON.parse(localStorage.getItem("results")).result;
    moviesList.length && setMovies(moviesList);
  }, []);
  return <Movies moviesList={movies} />;
};
