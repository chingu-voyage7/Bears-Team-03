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
import Search from './Search';

import './App.css';

 class App extends React.Component {


  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if(token) {
      this.props.verifyUser(token);
    }
  }

  render() {
    
    const {registerUser, loginUser, logoutUser, auth, fetchProjects, createProject, editProject, deleteProject, deleteStatus, projects} = this.props;
    return (<Router>
    <>
      <Navigation auth={auth} logout={logoutUser} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={props => <Login {...props} login={loginUser} auth={auth}/>} />
        <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} />} />

        <Route exact path="/search" render={props => <Search {...props} fetchProjects={fetchProjects} editProject={editProject} deleteProject={deleteProject} prjs={projects} deleteStatus={deleteStatus} />} />

        <ProtectedRoute path="/create-project" component={ProjectPage} publish={createProject} auth={auth} />
        <ProtectedRoute path="/edit-project" component={ProjectPage} edit={editProject} auth={auth} />
      </Switch>
    </>
  </Router>
  )
    }
};

export default App;
