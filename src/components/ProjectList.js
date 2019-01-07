import React, { Component } from 'react'
import ListItem from './projectListItem/ListItem';

class ProjectList extends Component {


    editProject = (prj) => {
      this.props.history.push('/edit-project', { prj });
    }

  render() {
    return (
        <ul>
          {this.props.prjs.map(prj => <ListItem key={prj._id} prj={prj} editPrj={this.editProject} deletePrj={this.props.deleteProject} />
          )}
        </ul>
    )
  }
}

export default ProjectList
