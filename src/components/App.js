import React from 'react';
import {
 BrowserRouter as Router, Switch, Route, NavLink 
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import Login from './Login';
import Navbar from './navbar/Navbar';
import './App.css';

const App = ({registerUser, loginUser, logoutUser, createProject}) => (
  <Router>
    <>
      <Navbar>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/create-project">Create Project</NavLink>
        <button onClick={logoutUser}>Logout</button>
      </Navbar>
      <Switch>
        <Route path="/login" render={props => <Login {...props} login={loginUser} />} />
        <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} />} />
        <Route path="/create-project" render={props => <ProjectPage {...props} publish={createProject} />} />
      </Switch>
    </>
  </Router>
);

export default App;
