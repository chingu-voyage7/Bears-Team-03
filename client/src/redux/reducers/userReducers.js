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

export const registerUserReducer = (state = {isPending: false}, action) => {
  switch (action.type) {
    case registerUser.REQUEST:
      return {...state, isPending: true};
    case registerUser.SUCCESS:
    return {...state, isPending: false, newUser: action.payload};
    case registerUser.FAILURE:
    return {...state, isPending: false, ...action.payload};
    default:
      return state;
  }
};
