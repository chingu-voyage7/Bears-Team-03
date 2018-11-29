import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { fetchUsersReducer } from './userReducers';

const rootReducer = combineReducers({
  authState: authReducer,
  errorState: errorReducer,
  users: fetchUsersReducer,
});

export default rootReducer;
