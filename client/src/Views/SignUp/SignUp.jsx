import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Input,
  Form,
  Button,
  MessageLink,
  Message,
} from '../../Components/FormComponents';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { signup } from '../../api/api';
import { authContext } from '../../contexts/AuthContext';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(authContext);
  const history = useHistory();

  function resetForm() {
    setUsername('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup(username, password)
      .then(res => {
        if (res?.status === 200) {
          store.set.auth(true);
          return history.push({
            pathname: '/login',
            state: {
              username,
              password,
            },
          });
        }

        throw Error('email is taken, please try again.');
      })
      .catch(error => {
        resetForm();
        alert(error);
      });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo />
        <Input
          value={username}
          type="email"
          placeholder="Email Address"
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" value="Create Account" />
        <Message>
          <MessageLink to="/classes">See our classes</MessageLink> 🙂
        </Message>
      </Form>
    </Container>
  );
}
