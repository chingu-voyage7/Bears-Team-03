import React from 'react';
import { Container, Row, Col, Card, CardBody, ListGroup, Nav, NavItem, NavLink, TabContent, TabPane, Table, Badge, Button } from 'reactstrap';

import ProfileListItem from '../ProfileListItem';

import './profilePage.css';

class ProfilePage extends React.Component {
  state = {
    activeTab: 'profile',
    fullname: '',
    email: '',
    phone: '',
    volunteerField: [],
    zipCode: '',
    city: '',
    country: '',
    stateOrProvince: '',
    timeAvailability: ''
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    if (!this.props.auth.currentUser) {
      this.props.fetchUser();
    } else {
      const { fullname, email, phone, volunteerField, zipCode, city, country, stateOrProvince, timeAvailability } = this.props.auth.currentUser;
      this.setState({
        fullname, email, phone, volunteerField, zipCode, city, country, stateOrProvince, timeAvailability
      });
    }
  }

  render() {
    return (
      <Container className="title-page">
        <Row>
          <Col lg="4">
            <div className="profile-card shadow">
              <Card>
                <CardBody className="bg-primary text-center rounded-top">
                  <div className="user-box">
                    <img src="https://image.flaticon.com/icons/svg/149/149071.svg" alt="User profile" />
                  </div>
                  <h5 className="mb-1 text-white">{this.state.fullname}</h5>
                  <h6 className="text-light">Volunteer</h6>
                </CardBody>
                <CardBody>
                  <ListGroup>
                    <ProfileListItem
                      title={'Phone Number'}
                      data={this.state.phone}
                      icon={'fa fa-phone-square'}
                    />
                    <ProfileListItem
                      title={'Email Address'}
                      data={this.state.email}
                      icon={'fa fa-envelope'}
                    />
                    <ProfileListItem
                      title={'City'}
                      data={this.state.city}
                      icon={'fa fa-address-card'}
                    />
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col lg="8">
            <Card className="shadow">
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink onClick={() => { this.toggle('profile'); }}>
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={() => { this.toggle('edit'); }}>
                      Edit
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="profile">
                    <Row>
                      <Col sm="12">
                        <h5 className="mb-3">User Profile</h5>
                        <Row>
                          <Col md="6">
                            <h6>About</h6>
                            <p>I love to volunteer ❤</p>
                          </Col>
                          <Col md="6">
                            <h6>Global goals</h6>
                            {this.state.volunteerField && this.state.volunteerField.map((field, index) => {
                              return (<Badge key={index} color="dark">{field}</Badge>);
                            })}
                          </Col>
                          <Col md="6">
                            <Button
                              className="text-uppercase"
                              color="success"
                              size="l"
                              onClick={() => { this.props.history.push('/prlist') }}
                            >
                              <i className="fa fa-check" aria-hidden="true"></i> Accept applicants
                            </Button>
                          </Col>
                          <Button
                            className="text-uppercase"
                            color="success"
                            size="l"
                            onClick={() => { this.props.history.push('/user-projects') }}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i> Edit my projects
                            </Button>
                          <Col md="12">
                            <h5 className="mt-2 mb-3"><span className="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                            <Table striped hover>
                              <tbody>
                                <tr>
                                  <td>
                                    <strong>You</strong> applied to ACME Project
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="edit">
                    <Row>
                      {/* Here comes the edit tab */}
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfilePage; 