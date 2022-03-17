import React from "react";
import classes from "./MyPagination.module.css";
import { usePagination } from "../../../hooks/usePagination";

const MyPagination = ({ totalPages, changePage, page }) => {
  let pagesArray = usePagination(totalPages);

  return (
    <div className={classes.paginationWrap}>
      {pagesArray.map((p) => (
        <button
          onClick={() => changePage(p)}
          key={p}
          className={
            page === p ? classes.pageButtonCurrent : classes.pageButton
          }
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default MyPagination;
