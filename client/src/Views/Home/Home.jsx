import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Header from '../../Components/Header';
import Grid from './Grid';
import { HomeContainer, Heading, Container } from './HomeContainer';
import Searchbar from './Searchbar';
import { search } from '../../api/api';
import useSessionCheck from '../../hooks/useSessionCheck';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const history = useHistory();

  function handlePageClick(e) {
    setCurrentPage(e.selected + 1);
  }

  useSessionCheck();

  useEffect(() => {
    // initialize app with all classes
    setLoading(true);
    async function fetchData() {
      const response = await search(query, currentPage);
      await setClasses(response.output);
      await setTotalPages(response.totalPages);
      setTimeout(() => setLoading(false), 200);
    }
    fetchData();
  }, [currentPage, history.location.pathname, query, totalPages]);

  return (
    <HomeContainer>
      <Header />
      <Container>
        <Heading>Classes</Heading>
        <Searchbar query={query} setQuery={setQuery} />
      </Container>
      <Grid classes={classes} loading={loading} />
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
        initialPage={currentPage}
      />
    </HomeContainer>
  );
}
