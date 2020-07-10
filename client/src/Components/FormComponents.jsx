import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.div`
  background-color: #fff;
  height: 280px;
  width: 392px;
  border-radius: 4px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const Input = styled.input`
  border: 1px solid #cbcece;
  border-radius: 4px;
  width: 90%;
  height: 40px;
  font-size: 14px;
  padding-left: 16px;
`;

export const Button = styled.input`
  width: 90%;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 2px;
  text-align: center;
  background-color: #0b79fb;
  border: none;
  color: #fff;
  cursor: pointer;
`;

export const Message = styled.span`
  font-size: 14px;
  color: #000;
`;

export const MessageLink = styled(Link)`
  font-size: 14px;
  color: #0b79fb;
  text-decoration: none;
  cursor: pointer;
`;
