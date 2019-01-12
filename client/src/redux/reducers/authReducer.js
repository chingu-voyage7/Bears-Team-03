import { loginProcess, LOGOUT } from '../types';
/*
This is a reducer - Based on the different actions it
receives it return a different state which become part of
the store
*/
const authReducer = (state = { isLoggedIn: false, error: {} }, action) => {
  switch (action.type) {
    case loginProcess.REQUEST:
      return state;
    case loginProcess.SUCCESS:
      return { ...state, error: {}, ...action.payload };
    case loginProcess.FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { isLoggedIn: false, error: {} };
    case loginProcess.RESET_ERR:
      return { ...state, error: {} };
    default:
      return state;
  }
};

export default authReducer;