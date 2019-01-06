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

    componentDidUpdate(prevProps) {
      if(this.props.deleteStatus !== prevProps.deleteStatus) {
        this.fetchProjects();   // should be enough to slice the state^^
      }
    }

    fetchProjects = () => {
      this.props.fetchProjects()
      .then(() => this.setState({
        prjs: this.props.prjs.projects
      }))
      .catch(err => console.log(err));
    }

    editProject = (prj) => {
      this.props.history.push('/edit-project', { prj });
    }

  render() {
    return (
      <div>
        <ul>
          {this.state.prjs.map(prj => <ListItem key={prj._id} prj={prj} editPrj={this.editProject} deletePrj={this.props.deleteProject} />
          )}
        </ul>
      </div>
    )
  }
}

export default Home
