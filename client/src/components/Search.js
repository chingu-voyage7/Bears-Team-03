import React, { Component } from 'react'

import { Container, Row, Col, Input } from 'reactstrap';

import ListItem from './projectListItem/ListItem';

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

    fetchProjects = () => {
        this.props.fetchProjects()
        .then(() => this.setState({
            prjs: this.props.projects.projects
        }))
        .catch(err => console.log(err));
    }

    filterProjects = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    detailsProject = (prj) => {
        this.props.history.push('/details-project', { prj });
    }

  render() {
    const { prjFilter, prjs} = this.state;
    let pattern = new RegExp(prjFilter, 'i');
    let visibleProjects = prjs.filter(prj => pattern.test(prj.projectName));

    return (
            <Container className="title-page" fluid>
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
                    {visibleProjects.map(prj => <ListItem 
                    key={prj._id} 
                    prj={prj} 
                    detailsPrj={this.detailsProject}/>
                    )}
                </ul>
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Search
