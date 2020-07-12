import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { authContext } from '../contexts/AuthContext';
import { logout } from '../api/api';

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
  height: 2rem;
  width: 513px;
  border: 1px solid #222222;
  border-radius: 4px;
  margin-left: auto;
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
    <span>
      <Link to="/classes" onClick={handleLogout}>
        Logout
      </Link>
    </span>
  );

  return (
    <Container>
      <Heading>Classes</Heading>
      {store.get.loading ? '' : nav}
      <SearchBar />
    </Container>
  );
}
