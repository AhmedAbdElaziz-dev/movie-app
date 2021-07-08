import Movies from "../movies";
import { getMovies, getSearchedMovies } from "../../api/movie";
import { Fragment, useEffect, useState } from "react";
import * as classes from "./style.module.css";
import { movieFilterTypes } from "./constants";
import Paginator from "../paginator";

export const Home = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const [isFilterOpend, setIsFilterOpend] = useState(false);
  const [filter, setFilter] = useState("top_rated");
  const [search, setSearch] = useState("");

  const filterHandler = (type) => {
    setFilter(type);
  };

  const filterOpenHnadler = () => {
    setIsFilterOpend(!isFilterOpend);
  };

  const searchHandler = async () => {
    const {
      data: { results },
    } = await getSearchedMovies(search, 1);

    setMoviesList(results);
  };
  const onPageChange = async (page) => {
    const {
      data: { results },
    } = await getMovies(filter, page);
    setMoviesList(results);
  };
  useEffect( () => {
    async function fetchData() {
      const {
        data: { results, total_pages },
      } = await getMovies(filter, 1);
      setTotalPages(total_pages);
      setMoviesList(results);
    }
    fetchData()
  }, [filter]);

  return (
    <Fragment>
      <div className={classes["nav-bar__search"]}>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <a
          to={`/search`}
          className={classes["nav-bar__search__btn"]}
          onClick={searchHandler}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
      </div>
      <div
        className={classes["filter"]}
        id="toggler"
        onClick={filterOpenHnadler}
      >
        <span className={classes["filter__text"]}>Filters</span>
        <i className="fa fa-align-left" aria-hidden="true"></i>
        <div
          className={isFilterOpend ? classes["toggle_open"] : classes["toggle"]}
        >
          <div className={classes["toggle__wrapper"]}>
            <nav id="nav">
              <ul id="tooglerUl">
                {Object.keys(movieFilterTypes).map((type, index) => (
                  <li
                    key={index}
                    className={classes["toogle__wrapper__item"]}
                    onClick={() => filterHandler(movieFilterTypes[type].query)}
                  >
                    <a to=""> {movieFilterTypes[type].text} </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className={classes["section"]}>
        <h2 className={classes["section__header"]}>
          {movieFilterTypes[filter].text}
        </h2>
      </div>
      <Movies moviesList={moviesList} />
      <Paginator
        lateralSegmentSize={1}
        middleSegmentSize={5}
        totalNumbers={totalPages}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
};
