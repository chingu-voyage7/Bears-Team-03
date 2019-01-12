import React, { Component } from 'react'

import { Container, Row, Col, Input } from 'reactstrap';

import List from './ProjectList';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prjs: [],
      prjFilter: ''
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
            prjs: this.props.projects.projects
        }))
        .catch(err => console.log(err));
    }

    editProject = (prj) => {
        this.props.history.push('/edit-project', { prj });
    }

    filterProjects = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

  render() {
    const { deleteProject} = this.props;
    const { prjFilter, prjs} = this.state;
    let pattern = new RegExp(prjFilter, 'i');
    let visibleProjects = prjs.filter(prj => pattern.test(prj.projectName));

    return (
        <Container fluid>
            <Row style={{marginTop: "2rem"}}>
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
                <List editProject={this.editProject} deleteProject={deleteProject} prjs={visibleProjects} />
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Search
