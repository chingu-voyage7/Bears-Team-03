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
      this.props.fetchPrjs()
      .then(() => this.setState({
        prjs: this.props.prjs.projects
      }))
      .catch(err => console.log(err));
    }

    editProject = prj => {
      this.props.history.push({
        pathname:'/edit-project',
        prj
      });
    }

    deleteProject = prjId => {
      this.props.erase(prjId)
        .then(() => {
          console.log(this.props.deleteStatus)
        })
    }

  render() {
    return (
      <div>
        <ul>
          {this.state.prjs.map(prj => <ListItem key={prj._id} prj={prj} />
          )}
        </ul>
      </div>
    )
  }
}

export default Home
