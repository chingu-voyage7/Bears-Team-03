import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import Login from './Login';
import Navigation from './navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Page404 from './Page404';
import ErrorBoundary from './ErrorBoundary';

import './App.css';

const App = ({ registerUser, loginUser, logoutUser, createProject, auth, regStatus, projectCreationStatus }) => (
  <Router>
    <>
      <Navigation auth={auth} logout={logoutUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={props => <Login {...props} login={loginUser} auth={auth}/>} />
        <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} regStatus={regStatus}/>} />
        {/* <Route path="/projects" render={props => <ProjectsPage {...props} search={searchByName} />} /> */}
        <ProtectedRoute path="/create-project" component={() => <ProjectPage publish={createProject} prjStatus={projectCreationStatus}/>}  auth={auth} />
        <Route component={Page404} />
      </Switch>
    </>
  </Router>
);

const BoundaryApp = ({ registerUser, loginUser, logoutUser, createProject, auth, regStatus, projectCreationStatus }) => <ErrorBoundary><App  registerUser={registerUser} loginUser={loginUser} logoutUser={logoutUser} createProject={createProject} auth={auth} regStatus={regStatus} projectCreationStatus={projectCreationStatus} /></ErrorBoundary>;

export default BoundaryApp;
