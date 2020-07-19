import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Search } from '../../assets/search.svg';

const Container = styled.form`
  input {
    line-height: 2;
    margin-left: 11px;
    font-size: 14px;
    background: none;
    border: none;
    outline: none;
    width: 100%;
  }
  height: 2rem;
  width: 513px;
  border-radius: 4px;
  background-color: #ebefef;
  margin-left: auto;
  display: flex;
  align-items: center;
  span {
    margin-left: auto;
    margin-right: 0;
    border-radius: 0 4px 4px 0;
    background-color: #222;
    width: 37px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export default function Searchbar({ query, setQuery }) {
  return (
    <Container onSubmit={e => e.preventDefault()}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <span>
        <Search />
      </span>
    </Container>
  );
}
