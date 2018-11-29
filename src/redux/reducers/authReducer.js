import { logout } from '../types';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case logout:
      return state;
    default:
      return state;
  }
};

export default authReducer;
