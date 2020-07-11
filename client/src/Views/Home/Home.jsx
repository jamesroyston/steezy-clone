import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ReactPaginate from 'react-paginate';
import Header from '../../Components/Header';
import Grid from './Grid';
import getClassList from '../../api/api';

const Container = styled.div`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #fff;

  .pagination {
    margin-top: 6.4em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    padding: 0;
    font-weight: bolder;
    .previous,
    .next {
      border: none;
      margin: 0;
      font-size: 22px;
      line-height: 2;
    }
    li {
      cursor: pointer;
      a {
        cursor: pointer;
        outline: none;
        width: 100%;
        height: 100%;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
      font-family: Poppins, sans-serif;
      display: flex;
      list-style: none;
      margin: 0 0.5em;
      color: #b4b7b7;
      border: 3px solid #b4b7b7;
      border-radius: 8px;
      font-size: 14px;
      width: 2em;
      height: 2em;
    }
    li.active {
      color: #0b79fb;
      border: 3px solid #0b79fb;
    }
    .break-me {
      display: none;
    }
  }
`;

export default function Home() {
  const [classes, setClasses] = useState([]);
  const [pages, setPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getClassList(pageNumber);
      setClasses(response.data.data);
      setPageNumber(response.data.pageNumber);
      if (pages === null) {
        setPages(response.data.pages);
      }
    }
    fetchData();
  }, [pageNumber, pages]);

  function handlePageClick(e) {
    console.log(e);
    // pages are zero-indexed
    setPageNumber(e.selected + 1);
  }

  return (
    <Container>
      <Header />
      <Grid pages={pages} pageNumber={pageNumber} classes={classes} />
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
    </Container>
  );
}
