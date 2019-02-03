/*
This new component is explicitly created to emphasize the
fact that a new component is returned from the  'connect'
function
*/
import { connect } from 'react-redux';
import { fetchUsersAction, registerUserAction, resetRegistrationErrorAction } from '../redux/actions/userActions';
import { loginAction, verifyAction, logoutAction, resetLoginErrorAction, fetchUserAction } from '../redux/actions/authActions';

import { fetchProjectsAction, createProjectAction, editProjectAction, deleteProjectAction, resetProjectErrorAction, toggleSubscriptionAction } from '../redux/actions/projectActions';

import App from '../components/App';

/*
This method is used to make the reducers' state available to the component - Named by convention
*/

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errorState,
  auth: state.authState,
  regStatus: state.registrationStatus,
  prjStatus: state.projectCreationStatus,
  deleteStatus: state.deleteProjectStatus,
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
  fetchProjects: () => dispatch(fetchProjectsAction()),
  createProject: (projectData, history) => dispatch(createProjectAction(projectData, history)),
  editProject: (projectData, history) => dispatch(editProjectAction(projectData, history)),
  deleteProject: prjId => dispatch(deleteProjectAction(prjId)),
  resetProjectError: () => dispatch(resetProjectErrorAction()),
  resetLoginError: () => dispatch(resetLoginErrorAction()),
  resetRegistrationError: () => dispatch(resetRegistrationErrorAction()),
  toggleSubscription: prjId => dispatch(toggleSubscriptionAction(prjId)),
  fetchUser: () => dispatch(fetchUserAction()),
});

/*
Connect is a function that return a component connected to the
redux store - It has access to the above created props
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
