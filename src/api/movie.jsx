import axios from "axios";

export const getSearchUrl = (query, page) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=0eecbba72bbc9317bb543b2392f24043&language=en-US&query=${query}&page=${page}`;
};

export const getMovieshUrl = (section, page) => {
  return `https://api.themoviedb.org/3/movie/${section}?api_key=0eecbba72bbc9317bb543b2392f24043&language=en-US&page=${page}`;
};

export const getMovies = (section, page) => {
  return axios.get(getMovieshUrl(section, page));
};

export const getSearchedMovies = (query, page) => {
  return axios.get(getSearchUrl(query, page));
};
