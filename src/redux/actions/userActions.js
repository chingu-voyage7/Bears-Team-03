import { fetchUsers, GENERAL_FAILURE } from '../types';
/*
 fetch data - asynchronous action creator
 The 'dispatch' method is disposable thanks to redux thunk.
 That way you can dispatch different sync action inside one single  async action
  */
const fetchUsersAction = () => (dispatch) => {
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
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export default fetchUsersAction;
