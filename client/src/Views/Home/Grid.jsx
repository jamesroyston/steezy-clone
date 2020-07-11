import React from 'react';
import styled from 'styled-components/macro';
import Card from './Card';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 70%;
  padding: 0 6rem;
  justify-content: space-between;

  // pushes last card over since last row has two items instead of three
  ::after {
    content: '';
    flex: 1/3;
    width: 32%;
    height: 35%;
  }
`;

export default function Grid({ classes }) {
  return (
    <Container>
      {classes?.map(elt => (
        <Card
          key={elt._id}
          id={elt._id}
          title={elt.title}
          instructor={elt.instructor}
          level={elt.level}
          song={elt.songs}
          slug={elt.thumbnailSlug}
          url={elt.videoUrl}
        />
      ))}
    </Container>
  );
}
