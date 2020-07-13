import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { authContext } from '../contexts/AuthContext';
import { logout } from '../api/api';
import { ReactComponent as SteezySVG } from '../assets/steezy.svg';
import { ReactComponent as User } from '../assets/user.svg';

const Container = styled.div`
  height: 60px;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 0.5rem;
  //padding: 0em 6rem;
  border-bottom: 3px solid #ebefef;
  span {
    margin: 0 1rem 0 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
  div {
    margin-left: auto;
    height: 100%;
    display: flex;
  }
  .steezy_logo {
    width: 150px;
  }

  .user_logo {
    width: 33px;
  }
`;

const HeaderLink = styled(Link)`
  height: 105%;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.9px;
  color: #222;
  text-decoration: none;
  background-color: #ebefef;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  :hover {
    color: #fff;
    background-color: #0b79fb;
    text-decoration: none;
  }
`;

const HeaderLinkMain = styled(Link)`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1.9px;
  color: #222;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  border-top: 5px solid #222;
  height: 100%;
  :hover {
    border-top: 5px solid #ebefef;
    text-decoration: none;
    color: #222;
  }
`;

export default function Header() {
  const { store } = useContext(authContext);

  function handleLogout() {
    logout().then(() => store.set.auth(false));
  }

  const nav = !store.get.auth ? (
    <>
      <div>
        <HeaderLink to="/login">LOGIN</HeaderLink>
        <HeaderLink style={{ color: '#fff', backgroundColor: '#0b79fb' }} to="/signup">
          SIGN-UP
        </HeaderLink>
      </div>
    </>
  ) : (
    <>
      <div>
        <span>
          <User className="user_logo" />
          <strong>{store.get.user.substring(0, store.get.user.indexOf('@'))}</strong>
        </span>
        <HeaderLink to="/classes" onClick={handleLogout}>
          LOGOUT
        </HeaderLink>
      </div>
    </>
  );

  return (
    <Container>
      <SteezySVG className="steezy_logo" />
      <HeaderLinkMain to="/classes">CLASSES</HeaderLinkMain>
      {store.get.loading ? '' : nav}
    </Container>
  );
}
