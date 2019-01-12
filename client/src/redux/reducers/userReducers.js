import { fetchUsers, registerUser } from '../types';

/*
This is a reducer - Based on the different actions it
receives it return a different state which become part of
the store
*/
export const fetchUsersReducer = (state = [], action) => {
  switch (action.type) {
    case fetchUsers.REQUEST:
      return state;
    case fetchUsers.SUCCESS:
      return state;
    case fetchUsers.FAILURE:
      return state;
    default:
      return state;
  }
};

export const registerUserReducer = (state = {isPending: false, error: {}}, action) => {
  switch (action.type) {
    case registerUser.REQUEST:
      return {...state, isPending: true};
    case registerUser.SUCCESS:
      return { isPending: false, newUser: action.payload, error: {}};
    case registerUser.FAILURE:
      return {isPending: false, error: action.payload, newUser: {}};
    case registerUser.RESET_ERR:
      return {isPending: false, error: {}, newProject: {}};
    default:
      return state;
  }
};
