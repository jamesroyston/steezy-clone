import React, { useState, useContext, useEffect } from 'react';
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
import { login } from '../../api/api';
import { authContext } from '../../contexts/AuthContext';

export default function Login() {
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
    login(username, password)
      .then(res => {
        if (res.status === 200) {
          store.set.auth(true);
          return history.push('/classes');
        }

        throw Error('email or password was incorrect or not found');
      })
      .catch(error => {
        resetForm();
        alert(error);
      });
  }

  useEffect(() => {
    if (history.location.state) {
      setUsername(history.location.state.username);
      setPassword(history.location.state.password);
    }
  }, [history.location.state]);

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
        <Button type="submit" value="Log In" />
        <Message>
          Don't have an account? <MessageLink to="/signup">Sign Up</MessageLink>
        </Message>
        <Message>
          <MessageLink to="/classes">See our classes</MessageLink> 🙂
        </Message>
      </Form>
    </Container>
  );
}
