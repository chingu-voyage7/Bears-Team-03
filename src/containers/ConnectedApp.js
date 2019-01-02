/*
This new component is explicitly created to emphasize the
 fact that a new component is returned from the  'connect'
 function
 */
import { connect } from 'react-redux';
import {fetchUsersAction, registerUserAction} from '../redux/actions/userActions';
import { loginAction, verifyAction, logoutAction } from '../redux/actions/authActions';

import { createProjectAction } from '../redux/actions/projectActions';

import App from '../components/App';

/*
 This method is used to make the reducers' state available to the component - Named by convenction
  */

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errorState,
  auth: state.authState,
});
/*
  This method is used to link the action creators to specific
  properties allowing them to be dispatched from the related prop - Named by convention
 */
const mapDispatchToProps = dispatch => ({
  registerUser: registrationData => dispatch(registerUserAction(registrationData)),
  fetchUsers: () => dispatch(fetchUsersAction()),
  loginUser: loginData => dispatch(loginAction(loginData)),
  verifyUser: token => dispatch(verifyAction(token)),
  logoutUser: () => dispatch(logoutAction()),
  createProject: projectData => dispatch(createProjectAction(projectData))
});

/*
Connect is a function that return a component connected to the
redux store - It has access to the above created props
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
