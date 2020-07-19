import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 6rem;
  @media (max-width: 620px) {
    padding: 0 1rem;
  }
  margin-bottom: 0.5rem;
`;

export const Heading = styled.h1`
  font-weight: bold;
  font-size: 32px;
  @media (max-width: 800px) {
    font-size: 22px;
  }
  margin: 0 3rem 0 0;
`;

export const HomeContainer = styled.div`
  // hide scrollbar on ios safari
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100vw;
  background-color: #fff;

  .pagination {
    margin: 1em 0 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    font-weight: bolder;
    .previous,
    .next {
      border: none;
      margin: 0;
      font-size: 22px;
      line-height: 2;
    }
    li {
      cursor: pointer;
      a {
        cursor: pointer;
        outline: none;
        width: 100%;
        height: 100%;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
      font-family: Poppins, sans-serif;
      display: flex;
      list-style: none;
      margin: 0 0.5em;
      color: #b4b7b7;
      border: 3px solid #b4b7b7;
      border-radius: 8px;
      font-size: 14px;
      width: 2em;
      height: 2em;
    }
    li.active {
      color: #0b79fb;
      border: 3px solid #0b79fb;
    }
    .break-me {
      //display: none;
    }
  }
`;

export const NoResults = styled.div`
  display: ${props => (props.showing ? 'block' : 'none')};
  font-weight: bold;
  padding: 0 6rem;
  @media (max-width: 620px) {
    padding: 0 1rem;
  }
`;
