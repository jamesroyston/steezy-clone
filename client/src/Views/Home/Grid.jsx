import React from 'react';
import styled from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import Card from './Card';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: fit-content;
  padding: 0 6rem;
  overflow-y: hidden;
  @media (max-width: 620px) {
    padding: 0 1rem;
  }
  align-content: flex-start;
  justify-content: space-between;

  // pushes last card over since last row has two items instead of three
  ::after {
    content: '';
    width: 32%;
  }
`;

const Skel = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  @media (max-width: 1220px) {
    width: 49%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  width: 31%;
  height: calc(70vh / 3);
`;

export default function Grid({ classes, loading }) {
  return (
    <Container>
      {loading
        ? [...Array(9).keys()].map(i => (
            <Skel key={i}>
              <Skeleton height="100%" />
            </Skel>
          ))
        : classes?.map(elt => (
            <Card
              key={elt._id}
              id={elt._id}
              title={elt.title}
              instructor={elt.instructor}
              level={elt.level}
              song={elt.songs}
              slug={elt.thumbnailSlug}
              url={elt.videoUrl}
              progress={elt.userIds[0]?.progress ?? 0}
            />
          ))}
    </Container>
  );
}
