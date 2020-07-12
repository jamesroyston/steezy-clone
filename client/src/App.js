import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import SignUp from './Views/SignUp/SignUp';
import ClassPage from './Views/ClassPage/ClassPage';
import NoMatch from './Views/NoMatch';
import Store from './contexts/AuthContext';

function App() {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/classes" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/classes" component={Home} />
          <PrivateRoute path="/classes/:id" component={ClassPage} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
