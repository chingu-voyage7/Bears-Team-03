import { fetchUsers } from '../types';

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

export const registerUserReducer = () => {};
