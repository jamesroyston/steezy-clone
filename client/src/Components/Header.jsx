import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  width: 100%;
  //justify-content: space-between;
  align-items: center;
  padding: 1.8rem 6rem !important;

  span {
    margin: 0 1rem;
  }
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 32px;
`;

const SearchBar = styled.div`
  height: 2rem;
  width: 513px;
  border: 1px solid #222222;
  border-radius: 4px;
  margin-left: auto;
`;

export default function Header() {
  return (
    <Container>
      <Heading>Classes</Heading>
      <span>Login</span>
      <SearchBar />
    </Container>
  );
}
