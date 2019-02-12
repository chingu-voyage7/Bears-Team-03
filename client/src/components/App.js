import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import ProjectDetails from './projectDetails/ProjectDetails';
import Login from './Login';
import Navigation from './navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import ConnectedSearch from '../containers/ConnectedSearch';
import ConnectedProjects from '../containers/ConnectedProjects';
import Page404 from './Page404';
import ErrorBoundary from './ErrorBoundary';
import ProfilePage from './profilePage/ProfilePage';
import './App.css';

class App extends React.Component {


  async componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await this.props.verifyUser(token);
        await this.props.fetchUser();
      } catch (err ) {
        console.log(err);
      }      
    }
  }

  render() {
    const { registerUser, loginUser, logoutUser, auth, createProject, editProject, regStatus, prjStatus, resetProjectError, resetLoginError, resetRegistrationError, toggleSubscription, fetchUser, setApplicantStatus, editUser, setNotification } = this.props;
    return (
      <ErrorBoundary>
        <Router>
          <>
            <Navigation logout={logoutUser} auth={auth} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" render={props => <Login {...props} login={loginUser} fetchUser={fetchUser} resetErr={resetLoginError} auth={auth} />} />
              <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} regStatus={regStatus} resetErr={resetRegistrationError} />} />
              <ProtectedRoute path="/profile" component={(props) => (<ProfilePage {...props} resetErr={resetProjectError} fetchUser={fetchUser} editUser={editUser} regStatus={regStatus} auth={auth} />)} auth={auth} />
              <Route path="/search" render={props => <ConnectedSearch setNotification={setNotification} {...props} auth={auth} />} />
              <Route path="/details-project" render={props => <ProjectDetails {...props} prjStatus={prjStatus} auth={auth} toggleSubscription={toggleSubscription} />} />
              <ProtectedRoute path="/user-projects" component={(props) => (<ConnectedProjects {...props} setApplicantStatus={setApplicantStatus} />)} auth={auth} />
              <ProtectedRoute path="/create-project" component={(props) => (<ProjectPage {...props} auth={auth} publish={createProject} prjStatus={prjStatus} resetErr={resetProjectError} />)} auth={auth} />
              <ProtectedRoute path="/edit-project" component={(props) => (<ProjectPage {...props} auth={auth} edit={editProject} prjStatus={prjStatus} resetErr={resetProjectError} />)} auth={auth} />
              <Route component={Page404} />
            </Switch>
          </>
        </Router>
      </ErrorBoundary>
    )
  }
};

export default App;