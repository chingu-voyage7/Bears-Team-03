/*
This new component is explicitly created to emphasize the
fact that a new component is returned from the  'connect'
function
*/
import { connect } from 'react-redux';

import { fetchProjectsAction, deleteProjectAction } from '../redux/actions/projectActions';

import Search from '../components/Search';

/*
This method is used to make the reducers' state available to the component - Named by convention
*/
const mapStateToProps = state => ({
  projects: state.projects,
  errors: state.errorState, 
  deleteStatus: state.deleteProjectStatus

});
/*
This method is used to link the action creators to specific
properties allowing them to be dispatched from the related prop - Named by convention
*/
const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAction()),
  deleteProject: prjId =>  dispatch(deleteProjectAction(prjId))
});

/*
Connect is a function that return a component connected to the
redux store - It has access to the above created props
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
