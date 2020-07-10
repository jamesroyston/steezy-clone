import React from 'react';
import styled from 'styled-components/macro';
import Card from './Card';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 65%;
  padding: 0 6rem;
  justify-content: space-between;
`;

export default function Grid() {
  return (
    <Container>
      {/* eventually we'll be looping over card data */}
      {/* so this means we'll probably be making api calls in here */}
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      <Card>asdf</Card>
      {/*  pagination component */}
    </Container>
  );
}
