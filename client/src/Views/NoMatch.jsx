import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: #000;
  color: white;
  height: 100vh;
  width: 100vw;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export default function NoMatch() {
  return (
    <Container>
      <iframe
        title="404 page"
        src="https://giphy.com/embed/FegNRoJc3EBGFwHZvB"
        width="480"
        height="480"
        frameBorder="0"
        allowFullScreen
      />
      <div>
        Well, this is awkward...that route wasn't found. Were you looking for our{' '}
        <Link to="/classes">classes</Link>?
      </div>
    </Container>
  );
}
