import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../../Components/Header';
import Grid from './Grid';
import { HomeContainer } from './HomeContainer';
import { getClassList } from '../../api/api';
import useSessionCheck from '../../hooks/useSessionCheck';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [pages, setPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(null);

  useSessionCheck();

  useEffect(() => {
    async function fetchData() {
      const response = await getClassList(pageNumber);
      setClasses(response.data.data);
      if (pageNumber === null) {
        setPageNumber(response.data.pageNumber);
      }
      if (pages === 0) {
        setPages(response.data.pages);
      }
      const loadingVal = setTimeout(() => {
        setLoading(false);
        clearTimeout(loadingVal);
      }, 500);
    }
    fetchData();
  }, [pageNumber, pages]);

  function handlePageClick(e) {
    // pages are zero-indexed
    setPageNumber(e.selected + 1);
  }

  return (
    <HomeContainer>
      <Header />
      <Grid pages={pages} pageNumber={pageNumber} classes={classes} loading={loading} />
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pages}
        marginPagesDisplayed={0}
        pageRangeDisplayed={4}
        onPageChange={e => handlePageClick(e)}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </HomeContainer>
  );
}
