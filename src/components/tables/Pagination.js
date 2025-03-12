import React from "react";

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
        ◀ Prev
      </button>
      <span className="page-number">Page {currentPage} of {totalPages}</span>
      <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-button">
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
