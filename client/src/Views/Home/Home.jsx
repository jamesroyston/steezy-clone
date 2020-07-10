import React from 'react';
import styled from 'styled-components/macro';
import Header from '../../Components/Header';
import Grid from './Grid';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
`;

export default function Home() {
  return (
    <Container>
      <Header />
      <Grid />
    </Container>
  );
}
