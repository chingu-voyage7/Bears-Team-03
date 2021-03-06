import { fetchProjects, createProject, deleteProject, GENERAL_FAILURE } from '../types';

export const fetchProjectsAction = () => (dispatch) => {
  dispatch({ type: fetchProjects.REQUEST });
  return fetch('/project/get-all')
    .then(res => res.json())
    .then((projects) => {
      if (projects.fail) {
        dispatch({ type: fetchProjects.FAILURE, payload: projects.fail });
      } else {
        dispatch({ type: fetchProjects.SUCCESS, payload: projects });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const fetchOwnProjectsAction = () => (dispatch) => {
  dispatch({ type: fetchProjects.REQUEST });

  const fetchOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
  };

  return fetch('/project/get-by-owner', fetchOptions)
    .then(res => res.json())
    .then((projects) => {
      if (projects.fail) {
        dispatch({ type: fetchProjects.FAILURE, payload: projects.fail });
      } else {
        dispatch({ type: fetchProjects.SUCCESS, payload: projects });
      }
    })
    .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
};

export const createProjectAction = (projectData, history) => (dispatch) => {
    dispatch({ type: createProject.REQUEST });
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
      body: JSON.stringify(projectData),
    };
    
    return fetch('/project/create-one', fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: createProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: createProject.SUCCESS, payload: project });
          history.push('/search');
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  };
  
  export const editProjectAction = (projectData, history) => (dispatch) => {
    dispatch({ type: createProject.REQUEST });
    const fetchOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
      body: JSON.stringify(projectData),
    };
    
    return fetch('/project/update-by-id', fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: createProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: createProject.SUCCESS, payload: project });
          history.push('/search');
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  };

  export const deleteProjectAction = (prjId) => (dispatch) => {
    dispatch({ type: deleteProject.REQUEST });
    const fetchOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
    };
    
    return fetch(`/project/delete-by-id?projectId=${prjId}`, fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: deleteProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: deleteProject.SUCCESS, payload: project });
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  };

  export const toggleSubscriptionAction = (prjId) => dispatch => {
    dispatch({ type: createProject.REQUEST });
    const fetchOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken}
    };

    return fetch(`/project/applicant/subscription?projectId=${prjId}`, fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: createProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: createProject.SUCCESS, payload: project.response });
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  }

  export const setStatusAction = (data) => dispatch => {
    dispatch({ type: createProject.REQUEST });
    const fetchOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
      body: JSON.stringify(data)
    };

    return fetch(`/project/applicant/set-status`, fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: createProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: createProject.SUCCESS, payload: project.response });
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  }

  export const setNotificationAction = prjId => dispatch => {
    dispatch({ type: createProject.REQUEST });
    const fetchOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Authorization': localStorage.accessToken},
      body: JSON.stringify({prjId})
    };

    return fetch(`/project/applicant/set-notification`, fetchOptions)
      .then(res => res.json())
      .then((project) => {
        if (project.fail) {
          dispatch({ type: createProject.FAILURE, payload: project.fail });
        } else {
          dispatch({ type: createProject.SUCCESS, payload: project });
        }
      })
      .catch(err => dispatch({ type: GENERAL_FAILURE, payload: err }));
  }


  export const resetProjectErrorAction = () => {
    return {type: createProject.RESET_ERR}};