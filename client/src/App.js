import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import SignUp from './Views/SignUp/SignUp';

function App() {
  return (
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
        <Route path="/classes">
          <Home />
        </Route>
        {/* need to make this route private */}
        <Route path="/classes/:id">
          {/* need to pass id to Class */}
          <Class />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
