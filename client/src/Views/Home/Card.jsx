import React from 'react';
import styled from 'styled-components/macro';
import background from '../../assets/class-thumbnail-1.jpg';

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid #222;
  border-radius: 8px;
  flex: 1/3;
  width: 32%;
  height: 35%;
  display: flex;
  position: relative;
  margin-bottom: 1.5rem;
`;

const LeftBlock = styled.div`
  width: 54px;
  background-color: #222;
  border-radius: 6px 0 0 6px;
`;

const Gradient = styled.div`
  margin-left: 53px;
  position: absolute;
  width: 196px;
  height: 100%;
  background: linear-gradient(
    90deg,
    #222222 0%,
    #222222 25.21%,
    rgba(34, 34, 34, 0.6) 56.05%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Image = styled.div`
  margin-left: auto;
  width: calc(100% - 100px);
  background-image: url(${background});
  background-size: cover;
  border-radius: 0 7px 7px 0;
`;

const Info = styled.div`
  position: absolute;
  z-index: 11111;
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 1rem 0 1rem 1rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  p {
    margin: 0;
  }

  .top {
    font-size: 15px;
    font-weight: bold;
  }

  .bottom {
    font-size: 11px;
    span {
      font-weight: bold;
    }
  }
`;

export default function Card() {
  return (
    <Container>
      <>
        <Info>
          <div className="top">
            <p>A two line title yuh yuh yuh</p>
            <p>and it keeps on going</p>
          </div>

          <div className="bottom">
            <p>
              Instructor: <span>Name</span>
            </p>
            <p>
              Level: <span>Advanced</span>
            </p>
            <p>
              Song: <span>Title of song</span>
            </p>
          </div>
        </Info>
      </>
      <>
        <Gradient />
        <>
          <LeftBlock />
          <Image />
        </>
      </>
    </Container>
  );
}
