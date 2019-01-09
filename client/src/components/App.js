import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import Login from './Login';
import Navigation from './navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Search from './Search';
import Page404 from './Page404';
import ErrorBoundary from './ErrorBoundary';
  
import './App.css';

 class App extends React.Component {


  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if(token) {
      this.props.verifyUser(token);
    }
  }

  render() {
    
    const {registerUser, loginUser, logoutUser, auth, fetchProjects, createProject, editProject, deleteProject, deleteStatus, projects, regStatus, projectCreationStatus} = this.props;
    return (<Router>

    <>
      <Navigation auth={auth} logout={logoutUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={props => <Login {...props} login={loginUser} auth={auth}/>} />
        <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} regStatus={regStatus}/>} />
        <Route exact path="/search" render={props => <Search {...props} fetchProjects={fetchProjects} deleteProject={deleteProject} prjs={projects} deleteStatus={deleteStatus} />} />
        <ProtectedRoute path="/create-project" component={(props) => (<ProjectPage {...props} publish={createProject} prjStatus={projectCreationStatus} />)}  auth={auth} />
        <ProtectedRoute path="/edit-project" component={(props) => (<ProjectPage {...props} edit={editProject} prjStatus={projectCreationStatus} />)} auth={auth} />
        <Route component={Page404} /> 
      </Switch>
    </>
  </Router>
  )
    }
};

const BoundaryApp = ({ registerUser, loginUser, logoutUser, createProject, fetchProjects, projects, auth, regStatus, projectCreationStatus, verifyUser, editProject, deleteProject, deleteStatus, }) => <ErrorBoundary><App  registerUser={registerUser} editProject={editProject} deleteProject={deleteProject} deleteStatus={deleteStatus} loginUser={loginUser} logoutUser={logoutUser} createProject={createProject} fetchProjects={fetchProjects} projects={projects} auth={auth} regStatus={regStatus} projectCreationStatus={projectCreationStatus} verifyUser={verifyUser}/></ErrorBoundary>;

export default BoundaryApp; 