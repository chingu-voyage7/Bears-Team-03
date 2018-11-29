import { GENERAL_FAILURE } from '../types';

/*
This is a reducer - Based on the different actions it
receives it return a different state which become part of
the store
*/
const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case GENERAL_FAILURE:
      return state;
    default:
      return state;
  }
};
export default errorReducer;
