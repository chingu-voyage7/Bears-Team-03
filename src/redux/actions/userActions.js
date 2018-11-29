import { fetchUsers, logout, generalFailure } from '../types';

// fetch data - asynchronous action creator
export const fetchUsersAction = () => (dispatch) => {
  dispatch({ type: fetchUsers.REQUEST });
  fetch('/user/get-all')
    .then(res => res.json())
    .then((users) => {
      if (users.fail) {
        dispatch({ type: fetchUsers.FAILURE, payload: users.fail });
      } else {
        dispatch({ type: fetchUsers.SUCCESS, payload: users });
      }
    })
    .catch(err => dispatch({ type: generalFailure, payload: err }));
};

// logout - synchronous action creator
export const logoutAction = () => ({ type: logout });
