import React, { useState } from "react";
import * as classes from "./style.module.css";

export default function Paginator({
  lateralSegmentSize,
  middleSegmentSize,
  totalNumbers,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const getFirstSegmentNumbers = () => {
    let firstSegment = [];
    for (let i = 1; i <= lateralSegmentSize; i++) {
      if (!getMiddleSegmentNumbers().includes(i)) {
        firstSegment.push(i);
      }
    }
    return firstSegment;
  };
  const shouldRenderFirstDots = () => {
    const sizeBesideCurrent = (middleSegmentSize - 1) / 2;
    return lateralSegmentSize + sizeBesideCurrent + 1 < currentPage;
  };
  const shouldRenderLastDots = () => {
    const sizeBesideCurrent = (middleSegmentSize - 1) / 2;
    return (
      lateralSegmentSize + sizeBesideCurrent + 1 <= totalNumbers - currentPage
    );
  };
  const getLastSegmentNumbers = () => {
    let lastSegment = [];
    for (
      let i = totalNumbers - lateralSegmentSize + 1;
      i <= totalNumbers;
      i++
    ) {
      if (!getMiddleSegmentNumbers().includes(i)) {
        lastSegment.push(i);
      }
    }
    return lastSegment;
  };
  const getMiddleSegmentNumbers = () => {
    let middleSegment = [];
    const sizeBesideCurrent = (middleSegmentSize - 1) / 2;
    for (let i = currentPage - sizeBesideCurrent; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalNumbers) {
        middleSegment.push(i);
      }
    }
    return middleSegment;
  };
  const onNext = (event) => {
    event.preventDefault();
    const newPage = currentPage + 1;
    if (newPage <= totalNumbers) {
      setCurrentPage(newPage);
    }

    onPageChange(newPage);
  };
  const onPageClick = (event,page) => {
    event.preventDefault();
    onPageChange(page)
  };

  const onPrevious = (event) => {
    const newPage = currentPage - 1;
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
    onPageChange(newPage);
  };

  return (
    <div className={classes["paginator"]}>
      <div className={classes["paginator__container"]}>
        <ul>
          <li onClick={onPrevious}>{"<"}prev</li>
          {getFirstSegmentNumbers().map((number, index) => (
            <li
              onClick={(e) => onPageClick(e,number)}
              key={`${index}-${number}`}
              className={classes["pageNumber"]}
            >
              {number}
            </li>
          ))}
        </ul>
        {shouldRenderFirstDots() && "..."}
        <ul>
          {getMiddleSegmentNumbers().map((number, index) => (
            <li
              onClick={(e) => onPageClick(e,number)}
              key={`${index}-${number}`}
              className={classes["pageNumber"]}
            >
              {number}
            </li>
          ))}
        </ul>
        {shouldRenderLastDots() && "..."}
        <ul>
          {getLastSegmentNumbers().map((number, index) => (
            <li
              onClick={(e) => onPageClick(e,number)}
              key={`${index}-${number}`}
              className={classes["pageNumber"]}
            >
              {number}
            </li>
          ))}
          <li onClick={onNext}>next{">"}</li>
        </ul>
      </div>
    </div>
  );
}
// }
