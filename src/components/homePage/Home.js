import React, { Component } from 'react'
import ListItem from '../projectListItem/ListItem';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prjs: []
    }
  }

    componentDidMount() {
        fetch('/project/get-all')
        .then(res => res.json())
        .then(prjs => {
          console.log(prjs);
          this.setState({
            prjs
          });
        })
        .catch(err => console.log(err));
    }

  render() {
    return (
      <div>
        <ul>
          {this.state.prjs.map(prj => <ListItem key={prj._id} prj={prj}/>)}
        </ul>
      </div>
    )
  }
}

export default Home
