import React from 'react';
import styled from 'styled-components/macro';
import { Container, Input, Form, Button } from '../../Components/FormComponents';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function Login() {
  return (
    <Container>
      <Form>
        <Logo />
        <Input placeholder="Email Address" />
        <Input placeholder="Password" />
        <Button type="submit" value="Create Account" />
      </Form>
    </Container>
  );
}
