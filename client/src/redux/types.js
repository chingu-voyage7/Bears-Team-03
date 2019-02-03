/*
These are the types of the dispatched actions. Basically it is a
unique identifier attached to each action thanks to which the
reducers can identify them.
The specific pattern ( a constant equal to a string ) have
the main purpose to avoid typos writing more times the same
string
*/

export const fetchUsers = {
  REQUEST: 'FETCH_USERS_REQUEST',
  SUCCESS: 'FETCH_USERS_SUCCESS',
  FAILURE: 'FETCH_USERS_FAILURE',
};

export const registerUser = {
  REQUEST: 'REGISTER_USER_REQUEST',
  SUCCESS: 'REGISTER_USER_SUCCESS',
  FAILURE: 'REGISTER_USER_FAILURE',
  RESET_ERR: 'REGISTER_RESET_ERR'
};

export const loginProcess = {
  REQUEST: 'LOGIN_REQUEST',
  SUCCESS: 'LOGIN_SUCCESS',
  FAILURE: 'LOGIN_FAILURE',
  RESET_ERR: 'LOGIN_RESET_ERR'
};

export const fetchProjects = {
  REQUEST: 'FETCH_PROJECT_REQUEST',
  SUCCESS: 'FETCH_PROJECT_SUCCESS',
  FAILURE: 'FETCH_PROJECT_FAILURE',
};

export const createProject = {
  REQUEST: 'CREATE_PROJECT_REQUEST',
  SUCCESS: 'CREATE_PROJECT_SUCCESS',
  FAILURE: 'CREATE_PROJECT_FAILURE',
  RESET_ERR: 'CREATE_PROJECT_RESET_ERR'
};

export const deleteProject = {
  REQUEST: 'DELETE_PROJECT_REQUEST',
  SUCCESS: 'DELETE_PROJECT_SUCCESS',
  FAILURE: 'DELETE_PROJECT_FAILURE',
};

export const GENERAL_FAILURE = 'GENERAL_FAILURE';
export const LOGOUT = 'LOGOUT';
