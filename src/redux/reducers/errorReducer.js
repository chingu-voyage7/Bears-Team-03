import { generalFailure } from '../types';

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case generalFailure:
      return state;
    default:
      return state;
  }
};
export default errorReducer;
