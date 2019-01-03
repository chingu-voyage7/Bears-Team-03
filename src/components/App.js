import React from 'react';
import {
 BrowserRouter as Router, Switch, Route, NavLink 
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import Login from './Login';
import Navbar from './navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
//import ListItem from './projectListItem/ListItem';
import Home from './homePage/Home';

import './App.css';

class App extends  React.Component {
  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if(token) {
      this.props.verifyUser(token);
    }
  }
    render() {
      const {registerUser, loginUser, logoutUser, createProject, auth} = this.props;
      return (
        <Router>
          <>
          { auth.isLoggedIn ?
            <Navbar>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/create-project">Create Project</NavLink>
              <button onClick={logoutUser}>Logout</button>
            </Navbar> :
            <Navbar>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </Navbar>
          }
            <Switch>
              <Route path="/login" render={props => <Login {...props} login={loginUser} />} />
              <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} />} />
              <ProtectedRoute path="/create-project" component={ProjectPage} publish={createProject} auth={auth} />
              <Route exact path="/" render={props => <Home {...props} />} />
            </Switch>
          </>
        </Router>
      )
    };
};

export default App;
