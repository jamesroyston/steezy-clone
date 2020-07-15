import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import Grid from './Grid';
import { HomeContainer, Heading, Container, NoResults } from './HomeContainer';
import Searchbar from './Searchbar';
import { search } from '../../api/api';
import useSessionCheck from '../../hooks/useSessionCheck';
import usePrevious from '../../hooks/usePrevious';
import Pagination from './Pagination';
import { authContext } from '../../contexts/AuthContext';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const prevQuery = usePrevious(query);
  const { store } = useContext(authContext);
  const [showingNoResults, setShowingNoResults] = useState(false);

  useSessionCheck();

  useEffect(() => {
    // initialize app with all classes
    setLoading(true);
    async function fetchData() {
      const response = await search(query, currentPage);
      if (prevQuery !== query) {
        await setCurrentPage(0);
      }
      await setClasses(response.output);
      await setTotalPages(response.totalPages);
      if (response.output.length !== 0) {
        setTimeout(() => setLoading(false), 200);
        setShowingNoResults(false);
      }

      // if zero results, quickly remove the skeleton loading cards
      setLoading(false);

      if (response.output.length === 0) {
        setShowingNoResults(true);
      }
    }
    fetchData();
  }, [currentPage, prevQuery, query, store.get.auth]);

  return (
    <HomeContainer>
      <Header />
      <Container>
        <Heading>Classes</Heading>
        <Searchbar query={query} setQuery={setQuery} />
      </Container>
      <NoResults showing={showingNoResults}>0 results for {query} :(</NoResults>
      <Grid classes={classes} loading={loading} />
      <Pagination currentPage={currentPage} handleClick={setCurrentPage} totalPages={totalPages} />
    </HomeContainer>
  );
}
