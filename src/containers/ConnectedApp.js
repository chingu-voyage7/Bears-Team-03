import { connect } from 'react-redux';
import fetchUsersAction from '../redux/actions/userActions';
import logoutAction from '../redux/actions/authActions';

import App from '../App';

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errorState,
  auth: state.authState,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersAction()),
  logout: () => dispatch(logoutAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
