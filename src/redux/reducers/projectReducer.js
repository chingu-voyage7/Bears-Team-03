import { createProject } from '../types';

export const createProjectReducer = (state = {isPending: false}, action) => {
    switch (action.type) {
      case createProject.REQUEST:
        return {...state, isPending: true};
      case createProject.SUCCESS:
      return {...state, isPending: false, project: action.payload};
      case createProject.FAILURE:
      return {...state, isPending: false, ...action.payload};
      default:
        return state;
    }
  };