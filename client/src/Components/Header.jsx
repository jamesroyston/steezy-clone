import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { authContext } from '../contexts/AuthContext';
import { logout } from '../api/api';
import { ReactComponent as Search } from '../assets/search.svg';

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1.8rem 6rem !important;

  span {
    margin: 0 0.5rem;
  }
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-right: 0.5em;
`;

const SearchBar = styled.div`
  input {
    line-height: 1;
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

export default function Header() {
  const { store } = useContext(authContext);

  function handleLogout() {
    logout().then(() => store.set.auth(false));
  }

  const nav = !store.get.auth ? (
    <>
      <span>
        <Link to="/login">Login</Link>
      </span>
      <span>
        <Link to="/signup">Sign Up</Link>
      </span>
    </>
  ) : (
    <>
      <span>
        Good to see you, <strong>{store.get.user.substring(0, store.get.user.indexOf('@'))}</strong>
        .
      </span>
      <span>
        <Link to="/classes" onClick={handleLogout}>
          Logout
        </Link>
      </span>
    </>
  );

  return (
    <Container>
      <Heading>Classes</Heading>
      {store.get.loading ? '' : nav}
      <SearchBar>
        <input type="text" placeholder="Search" />
        <span>
          <Search />
        </span>
      </SearchBar>
    </Container>
  );
}
