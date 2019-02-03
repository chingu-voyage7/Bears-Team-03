import { fetchUsers, registerUser, GENERAL_FAILURE } from '../types';
/*
fetch data - asynchronous action creator
The 'dispatch' method is disposable thanks to redux thunk.
That way you can dispatch different sync action inside one single  async action
*/
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
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const registerUserAction = registerData => (dispatch) => {
  dispatch({ type: registerUser.REQUEST });

  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerData),
  };
  return fetch('/user/register', fetchOptions)
    .then(res => res.json())
    .then((user) => {
      if (user.fail) {
        dispatch({ type: registerUser.FAILURE, payload: user.fail });
      } else {
        console.log('testSuccess', user);
        dispatch({ type: registerUser.SUCCESS, payload: user });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const resetRegistrationErrorAction = () => {
  return { type: registerUser.RESET_ERR }
};

export const editUserAction = (userData) => (dispatch) => {
  dispatch({ type: registerUser.REQUEST });
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.accessToken },
    body: JSON.stringify(userData),
  };

  return fetch('/user/update-by-id', fetchOptions)
    .then(res => res.json())
    .then((user) => {
      if (user.fail) {
        dispatch({ type: registerUser.FAILURE, payload: user.fail });
      } else {
        dispatch({ type: registerUser.SUCCESS, payload: user });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};
