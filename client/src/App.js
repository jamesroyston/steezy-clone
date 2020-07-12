import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import SignUp from './Views/SignUp/SignUp';
import ClassPage from './Views/ClassPage/ClassPage';
import Store from './contexts/AuthContext';

function App() {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/classes">
            <Home />
          </Route>
          <PrivateRoute path="/classes/:id" component={ClassPage} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
