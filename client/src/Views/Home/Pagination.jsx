import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ currentPage, handleClick, totalPages }) {
  const forcePageObj = {};
  if (currentPage === 0) {
    forcePageObj.forcePage = 0;
  }

  if (totalPages === 0) {
    return '';
  }

  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      breakClassName="break-me"
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      onPageChange={pageNumber => handleClick(pageNumber.selected + 1)}
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
      {...forcePageObj}
    />
  );
}
