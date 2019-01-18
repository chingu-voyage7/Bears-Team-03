import React, { Component } from 'react'
import ListItem from './projectListItem/ListItem';
import { withRouter } from 'react-router-dom';

class ProjectList extends Component {


    editProject = (prj) => {
      this.props.history.push('/edit-project', { prj });
    }

    detailsProject = (prj) => {
      this.props.history.push('/details-project', { prj });
  }

  render() {
    return (
        <ul>
          {this.props.prjs.map(prj => <ListItem 
          key={prj._id} 
          prj={prj} 
          detailsPrj={this.detailsProject}
          editPrj={this.editProject} 
          deletePrj={this.props.deleteProject} />
          )}
        </ul>
    )
  }
}

export default withRouter(ProjectList);
