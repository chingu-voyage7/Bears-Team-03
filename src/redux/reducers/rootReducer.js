import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { fetchUsersReducer, registerUserReducer } from './userReducers';
import { createProjectReducer } from './projectReducer';
/*
This is the root reducer - it combine the others reducers into
one so it can be passed to the createStore function ( into index.js);
*/
const rootReducer = combineReducers({
  authState: authReducer,
  errorState: errorReducer,
  users: fetchUsersReducer,
  registrationStatus: registerUserReducer,
  projectCreationStatus: createProjectReducer
});

export default rootReducer;
