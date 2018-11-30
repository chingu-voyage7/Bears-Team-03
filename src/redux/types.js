/*
These are the types of the dispatched actions. Basically it is a
unique idenfier attached to each action thanks to which the
reducers can identify them.
The specific pattern ( a constant   equal to a string ) have
the main purpose to avoid typos writing more times the same
string
*/

export const fetchUsers = {
  REQUEST: 'FETCH_USERS_REQUEST',
  SUCCESS: 'FETCH_USERS_SUCCESS',
  FAILURE: 'FETCH_USERS_FAILURE',
};

export const GENERAL_FAILURE = 'GENERAL_FAILURE';
export const LOGOUT = 'LOGOUT';
