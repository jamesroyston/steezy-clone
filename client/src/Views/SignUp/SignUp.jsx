import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Input, Form, Button } from '../../Components/FormComponents';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { signup } from '../../api/api';
import { authContext } from '../../contexts/AuthContext';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(authContext);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    signup(username, password)
      .then(() => {
        store.set.auth(true);
        history.push('/classes');
      })
      .catch(error => console.log(error));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo />
        <Input
          type="email"
          placeholder="Email Address"
          onChange={e => setUsername(e.target.value)}
        />
        <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <Button type="submit" value="Create Account" />
      </Form>
    </Container>
  );
}
