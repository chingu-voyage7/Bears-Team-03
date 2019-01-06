import React, { Component } from 'react'
import ListItem from './projectListItem/ListItem';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prjs: []
    }
  }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = () => {
      this.props.fetchProjects()
      .then(() => this.setState({
        prjs: this.props.prjs.projects
      }))
      .catch(err => console.log(err));
    }

  render() {
    return (
      <div>
        <ul>
          {this.state.prjs.map(prj => <ListItem key={prj._id} prj={prj} editPrj={this.props.editProject} deletePrj={this.props.deleteProject} />
          )}
        </ul>
      </div>
    )
  }
}

export default Home
