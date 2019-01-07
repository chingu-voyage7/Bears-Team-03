import { createProject, GENERAL_FAILURE } from '../types';

export const createProjectAction = projectData => (dispatch) => {
    dispatch({ type: createProject.REQUEST });
  
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
      body: JSON.stringify(projectData),
    };
console.log('projectdata',projectData)
    fetch('/project/create-one', fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: createProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: createProject.SUCCESS, payload: project });
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  };
  