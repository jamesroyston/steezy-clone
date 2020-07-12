import styled from 'styled-components/macro';

export const HomeContainer = styled.div`
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #fff;

  .pagination {
    margin: -1em 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
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
      display: none;
    }
  }
`;
