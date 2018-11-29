import { fetchUsers } from '../types';

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
