import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import Login from './Login';
import Navigation from './navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';

import './App.css';

const App = ({ registerUser, loginUser, logoutUser, createProject, auth }) => (
  <Router>
    <>
      <Navigation auth={auth} />
      <Switch>
        <Route path="/login" render={props => <Login {...props} login={loginUser} />} />
        <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} />} />
        <ProtectedRoute path="/create-project" component={ProjectPage} publish={createProject} auth={auth} />
      </Switch>
    </>
  </Router>
);

export default App;
