import { loginProcess, LOGOUT, GENERAL_FAILURE } from '../types';

export const loginAction = loginData => (dispatch) => {
  dispatch({ type: loginProcess.REQUEST });
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(loginData),
  };

  fetch('/login', fetchOptions)
    .then(res => res.json())
    .then((token) => {
      if (token.fail) {
        dispatch({ type: loginProcess.FAILURE, payload: token.fail });
      } else {
        localStorage.setItem('accessToken', token);
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
