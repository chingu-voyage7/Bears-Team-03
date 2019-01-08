
import { fetchProjects, createProject, deleteProject } from '../types';

/*
This is a reducer - Based on the different actions it
receives it return a different state which become part of
the store
*/
export const fetchProjectsReducer = (state ={error: null, isPending: false, projects: []}, action) => {
  switch (action.type) {
    case fetchProjects.REQUEST:
        return {...state, error: null, isPending: true, projects: []};
    case fetchProjects.SUCCESS:
        return {...state, isPending: false, projects: action.payload};
    case fetchProjects.FAILURE:
        return {...state, isPending: false, error: action.payload};
    default:
        return state;
  }
};

export const createProjectReducer = (state = {isPending: false}, action) => {
  switch (action.type) {
    case createProject.REQUEST:
      return {...state, error: null, isPending: true};
    case createProject.SUCCESS:
        return {...state, isPending: false, newProject: action.payload};
    case createProject.FAILURE:
        return {...state, isPending: false, action.payload};
    default:
      return state;
  }
};

export const deleteProjectReducer = (state = {error:null, isPending: false}, action) => {
    switch (action.type) {
      case deleteProject.REQUEST:
        return {...state, error: null, isPending: true};
      case deleteProject.SUCCESS:
          return {...state, isPending: false, deleteStatus: action.payload};
      case deleteProject.FAILURE:
          return {...state, isPending: false, error: action.payload};
      default:
        return state;
    }
  };