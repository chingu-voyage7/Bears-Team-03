import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, NavLink,
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import Login from './Login';
import Navbar from './navbar/Navbar';
import './App.css';

const App = () => (
  <Router>
    <>
    <Navbar>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </Navbar>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={RegistrationPage} />
    </Switch>
    </>
  </Router>
);

export default App;
