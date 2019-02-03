import React, { Component } from 'react'

import { Container, Row, Col, Input } from 'reactstrap';

import ProtectedListItem from './protectedListItem/ProtectedListItem';

class ProjectManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prjs: [],
      prjFilter: ''
        }
    }

    componentDidMount() {
        this.fetchProjects();
    };

    componentDidUpdate(prevProps) {
        if(this.props.deleteStatus !== prevProps.deleteStatus) {
            this.fetchProjects();   // should be enough to slice the state^^
        }
    }

    fetchProjects = () => {
        this.props.fetchProjects()
        .then(() => {
            this.setState({
            prjs: this.props.projects.projects
        })
    })
        .catch(err => console.log(err));
    }

    filterProjects = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    editProject = (prj) => {
        this.props.history.push('/edit-project', { prj });
      }

  render() {
    const { deleteProject, setApplicantStatus} = this.props;
    const { prjFilter, prjs} = this.state;
    let pattern = new RegExp(prjFilter, 'i');
    let visibleProjects = prjs.filter(prj => pattern.test(prj.projectName));

    return (
            <Container fluid className="title-page">
                <Row style={{ marginTop: "2rem" }}>
                <Col>
                    <Input 
                            type="text"
                            id="prjFilter"
                            name="prjFilter"
                            placeholder="Search for a specific project"
                            value={prjFilter}
                            onChange={this.filterProjects}
                        />
                <hr/>
                <ul>
                    {visibleProjects.map(prj => <ProtectedListItem 
                    key={prj._id} 
                    prj={prj} 
                    editPrj={this.editProject} 
                    deletePrj={deleteProject}
                    setApplicantStatus={setApplicantStatus}
                    />
                    
                    )}
                </ul>
                </Col>
            </Row>
        </Container>
    )
  }
}

export default ProjectManagement
