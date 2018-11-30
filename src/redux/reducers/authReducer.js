import { LOGOUT } from '../types';
/*
This is a reducer - Based on the different actions it
receives it return a different state which become part of
the store
*/
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export default authReducer;
