import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

import RegistrationPage from './RegistrationPage';
import ProjectPage from './projectForm/ProjectPage';
import ProjectDetails from './ProjectDetails';
import Login from './Login';
import Navigation from './navbar/Navbar';
import FakeList from './FakeProjList';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import ConnectedSearch from '../containers/ConnectedSearch';
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
    const {registerUser, loginUser, logoutUser, auth, createProject, editProject, regStatus, prjStatus, resetProjectError, resetLoginError, resetRegistrationError, toggleSubscription} = this.props;
    return (
      <ErrorBoundary>
          <Router>
              <>
                <Navigation logout={logoutUser}  auth={auth}/>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" render={props => <Login {...props} login={loginUser}  resetErr={resetLoginError} auth={auth}/>} />
                  <Route path="/register" render={props => <RegistrationPage {...props} register={registerUser} regStatus={regStatus}  resetErr={resetRegistrationError}/>} />
                  <Route path="/search" render={props => <ConnectedSearch {...props} />} />
                  <Route path="/details-project" render={props => <ProjectDetails {...props} prjStatus={prjStatus} auth={auth} toggleSubscription={toggleSubscription}/>} />
                  <ProtectedRoute path="/create-project" component={(props) => (<ProjectPage {...props} publish={createProject} prjStatus={projectCreationStatus} resetErr={resetProjectError} />)}  auth={auth} />
                  <ProtectedRoute path="/edit-project" component={(props) => (<ProjectPage {...props} edit={editProject} prjStatus={projectCreationStatus} resetErr={resetProjectError} />)} auth={auth} />
                  <ProtectedRoute path="/prlist" component={(props) => (<FakeList {...props} />)}  auth={auth} />
                  <Route component={Page404} /> 
                </Switch>
              </>
            </Router>
          </ErrorBoundary>
            )
    }
};

export default App;