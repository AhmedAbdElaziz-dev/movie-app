import React from "react";
import * as classes from "./style.module.css";

const movieItem = ({ description, title, rating, imageUrl }) => {
  function addToFavorite() {
    const movie = {
      overview: description,
      title,
      vote_average: rating,
      backdrop_path: imageUrl,
    };
    let favourites = JSON.parse(localStorage.getItem("results"));
    if (
      favourites &&
      !favourites.result.find((item) => item.title === movie.title)
    ) {
      favourites.result.push(movie);
      localStorage.setItem("results", JSON.stringify(favourites));
    } else if (!favourites) {
      favourites = { result: [] };
      favourites.result.push(movie);
      localStorage.setItem("results", JSON.stringify(favourites));
    }
  }
  return (
    <div className={classes["card"]}>
      <div className={classes["card__container"]}>
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : "assets/default.jpg"
          }
          alt=""
        />
      </div>
      <div className={classes["card__rating"]}> {rating} </div>

      <div className={classes["layer1"]}></div>
      <div className={classes["layer2"]}></div>
      <div className={classes["card__text"]}>
        <div>
          <h2 className={classes["mb_3 pb_1"]}> {title} </h2>
          <p>
            {description.length > 200
              ? description.substring(0, 200) + "..."
              : description}
          </p>
          <button className={classes["btn mt_2"]} onClick={addToFavorite}>
            Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default movieItem;
