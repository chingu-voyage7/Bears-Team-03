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
    
    clickHandler = async (e) => {

        let projectId = e.target.closest('div').id;
        let applicantId = e.target.closest('li').id;
        let status = e.target.id;
       await this.props.setApplicantStatus({projectId, applicantId, status});
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.projects.map(project => 
                        (
                        <div key={project._id} id={project._id}>
                            <h4>{project.projectName}</h4>
                            <ul onClick={this.clickHandler}>
                                {project.applicants.map(applicant => 
                                    (<li key={applicant.applicantInfo._id}  id={applicant.applicantInfo._id}>
                                        {applicant.applicantInfo.fullname} - {applicant.state}
                                        <button id="accept">Accept</button>
                                        <button id="reject">Reject</button>
                                    </li>)
                                )}
                            </ul>
                        </div>
                        )
                    )}
                </ul>
            </div>
          )
    }
}

export default FakeProjList
