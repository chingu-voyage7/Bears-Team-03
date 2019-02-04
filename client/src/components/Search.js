import React, { Component } from 'react'

import { Container, Row, Col, Input, Alert } from 'reactstrap';

import ListItem from './projectListItem/ListItem';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prjs: [],
      prjFilter: '',
      activeNotifications: []
        }

      this.fetchProjects = this.fetchProjects.bind(this)
    }

    async componentDidMount() {
        try {
            await this.fetchProjects();
            await this.checkForUpdates();
        } catch(error) {
            console.log(error);
        }
    }

    checkForUpdates = () => {
        let pendingRequestProjects = [];
        const { isLoggedIn} = this.props.auth;
        let currentUser = this.props.auth.currentUser || {};
        if(isLoggedIn) {
            this.state.prjs.forEach(prj => {
                prj.applicants.forEach(request => {
                    if (request.applicantInfo._id === currentUser._id && !request.notified && request.state !== 'pending'){
                        pendingRequestProjects.push({
                            id: prj._id, 
                            name: prj.projectName, 
                            status: request.state === 'accept' ? 'accepted' : 'rejected'
                        });
                    }
                });
            });

            this.setState({
                activeNotifications: pendingRequestProjects
            });
           setTimeout(() => {
               this.state.activeNotifications.forEach(prj => {
                   this.props.setNotification(prj.id)
               });
               this.setState({activeNotifications: []})
           }, 4000);
        };
    }

    async fetchProjects () {
        try {
            await  this.props.fetchProjects()
            this.setState({
                prjs: this.props.projects.projects
            })
        } catch(error) {
            console.log(error)
        }        
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
            {this.state.activeNotifications.map(notification => <Alert key={notification.id} color={notification.status === 'accepted' ? 'success' : 'danger'}>{`Your request for the project ${notification.name} has been ${notification.status}`}</Alert> )}
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
