import { loginProcess, LOGOUT, GENERAL_FAILURE } from '../types';

export const loginAction = loginData => (dispatch) => {
  dispatch({ type: loginProcess.REQUEST });
  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(loginData),
  };

  return fetch('/login', fetchOptions)
    .then(res => res.json())
    .then((authData) => {
      if (authData.fail) {
        dispatch({ type: loginProcess.FAILURE, payload: authData.fail });
      } else {
        localStorage.setItem('accessToken', authData.token);
        dispatch({ type: loginProcess.SUCCESS, payload: { isLoggedIn: true } });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const verifyAction = token => (dispatch) => {
  dispatch({ type: loginProcess.REQUEST });
  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token}),
  };

  return fetch('/verify-token', fetchOptions)
    .then(res => res.json())
    .then((authData) => {
      if (authData.fail) {
        dispatch({ type: loginProcess.FAILURE, payload: authData.fail });
      } else {
        dispatch({ type: loginProcess.SUCCESS, payload: { isLoggedIn: true } });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};
/*
 logout - synchronous action creator
 As action creator this function return an action, which can
 be considered as an object with a property named 'type' that
 identifies it
  */
export const logoutAction = () => {
  localStorage.removeItem('accessToken');
  return { type: LOGOUT };
};

export const resetLoginErrorAction = () => {
  return {type: loginProcess.RESET_ERR}};