import React from 'react'

class FakeProjList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            projects: []
        };
    }

    componentDidMount() {
          return fetch('/project/get-all')
            .then(res => res.json())
            .then((projects) => {
              this.setState({projects})
            })
            .catch(err => console.log('error', err));
    }
    
    render() {
        return (
            <div>
                <ul>
                    {this.state.projects.map(project => <li key={project._id}>{project.applicants}</li>)}
                </ul>
            </div>
          )
    }
}

export default FakeProjList
