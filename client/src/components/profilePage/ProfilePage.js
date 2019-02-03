import React from 'react';
import { Container, Row, Col, Card, CardBody, ListGroup, Nav, NavItem, NavLink, Button, TabContent, TabPane, Table, Badge, Form, FormGroup, Label, Input, FormFeedback, FormText, } from 'reactstrap';

import ProfileListItem from '../ProfileListItem';
import Error from '../ErrorNotification';

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
    timeAvailability: '',
    user: {
      fullname: '',
      email: '',
      gender: '',
      streetAddress: '',
      city: '',
      stateOrProvince: '',
      zipCode: '',
      country: '',
      phone: '',
      volunteerField: [],
      days: [],
      hours: [],
    },
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleMultipleChange = (event) => {
    const { name, options } = event.target;
    const { user } = this.state;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.props.editUser(this.state.user);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    if (!this.props.auth.currentUser) {
      this.props.fetchUser();
    } else {
      const { fullname, email, phone, volunteerField, zipCode, city, country, stateOrProvince, timeAvailability } = this.props.auth.currentUser;
      this.setState({
        fullname, email, phone, volunteerField, zipCode, city, country, stateOrProvince, timeAvailability, user: {
          fullname, email, phone, volunteerField, zipCode, city, country, stateOrProvince, timeAvailability
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.props.regStatus.error.validationErrors) {
      this.props.resetErr();
    }
  }

  render() {
    const { user } = this.state;
    const { validationErrors } = this.props.regStatus.error;
    return (
      <Container>
        <Row>
          <Col lg="4">
            <div className="profile-card shadow">
              <Card>
                <CardBody className="bg-primary text-center rounded-top">
                  <div className="user-box">
                    <img src="https://image.flaticon.com/icons/svg/149/149071.svg" alt="User profile image" />
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
                            {this.state.volunteerField.map((field, index) => {
                              return (<Badge key={index} color="dark">{field}</Badge>);
                            })}
                          </Col>
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
                      <Col sm="12">
                        <h5 className="mb-3">Edit Profile</h5>
                        <Form className="form" onSubmit={this.handleSubmit}>
                          <FormGroup>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="myemail@email.com"
                              value={user.email}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                            <FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
                            <FormFeedback>
                              Uh oh! Looks like there is an issue with your email. Please input a correct email.
            </FormFeedback>
                            {validationErrors && validationErrors.email &&
                              <FormText color="danger">{validationErrors.email.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label>Full name:</Label>
                            <Input
                              type="text"
                              name="fullname"
                              id="fullname"
                              placeholder="Example Joe"
                              value={user.fullname}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                            <FormFeedback>Please input your full name.</FormFeedback>
                            {validationErrors && validationErrors.fullname &&
                              <FormText color="danger">{validationErrors.fullname.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="gender">Gender:</Label>
                            <Input
                              type="select"
                              name="gender"
                              value={user.gender}
                              onChange={(e) => { this.handleChange(e); }}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Input>
                            <FormFeedback>Please input your gender.</FormFeedback>
                            {validationErrors && validationErrors.gender &&
                              <FormText color="danger">{validationErrors.gender.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="streetAddress">Address:</Label>
                            <Input
                              type="name"
                              name="streetAddress"
                              label="Address"
                              placeholder="123 Main Street"
                              value={user.streetAddress}
                              onChange={(e) => { this.handleChange(e); }}
                            />
                            <FormFeedback>Please input your address.</FormFeedback>
                            {validationErrors && validationErrors.streetAddress &&
                              <FormText color="danger">{validationErrors.streetAddress.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="city">City:</Label>
                            <Input
                              type="text"
                              name="city"
                              label="City"
                              placeholder="ExampleCity"
                              value={user.city}
                              onChange={(e) => { this.handleChange(e); }}
                            />
                            <FormFeedback>Please input your city.</FormFeedback>
                            {validationErrors && validationErrors.city &&
                              <FormText color="danger">{validationErrors.city.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="stateOrProvince">State/Province/Region:</Label>
                            <Input
                              type="text"
                              name="stateOrProvince"
                              label="State or Province"
                              placeholder="exampleState"
                              value={user.stateOrProvince}
                              onChange={(e) => { this.handleChange(e); }}
                            />
                            <FormFeedback>Please input your state.</FormFeedback>
                            {validationErrors && validationErrors.stateOrProvince &&
                              <FormText color="danger">{validationErrors.stateOrProvince.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="zipCode">ZIP:</Label>
                            <Input
                              type="text"
                              name="zipCode"
                              label="Zip Code"
                              placeholder="exampleZIP"
                              value={user.zipCode}
                              onChange={(e) => { this.handleChange(e); }}
                            />
                            <FormFeedback>Please input your ZIP code.</FormFeedback>
                            {validationErrors && validationErrors.zipCode &&
                              <FormText color="danger">{validationErrors.zipCode.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="country">Country/Region:</Label>
                            <Input
                              type="text"
                              name="country"
                              label="Country"
                              placeholder="exampleCountry"
                              value={user.country}
                              onChange={(e) => { this.handleChange(e); }}
                            />
                            <FormFeedback>Please input your country.</FormFeedback>
                            {validationErrors && validationErrors.country &&
                              <FormText color="danger">{validationErrors.country.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="phone">Phone number:</Label>
                            <Input
                              type="text"
                              name="phone"
                              label="Phone Number"
                              placeholder="+36-20-233-7788"
                              value={user.phone}
                              onChange={(e) => { this.handleChange(e); }}
                            />
                            <FormFeedback>Please input your phone number.</FormFeedback>
                            {validationErrors && validationErrors.phone &&
                              <FormText color="danger">{validationErrors.phone.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="volunteerField">What Global Goals do you want to support?</Label>
                            <Input
                              type="select"
                              name="volunteerField"
                              multiple
                              value={user.volunteerField}
                              onChange={(e) => {
                                this.handleMultipleChange(e);
                              }}
                            >
                              <option value="1">1. No Poverty</option>
                              <option value="2">2. Zero Hunger</option>
                              <option value="3">3. Good Health and Well Being</option>
                              <option value="4">4. Quality Education</option>
                              <option value="5">5. Gender Equality</option>
                              <option value="6">6. Clean Water and Sanitation</option>
                              <option value="7">7. Affordable and Clean Energy</option>
                              <option value="8">8. Decent Work and Economic Growth</option>
                              <option value="9">9. Industry, Innovation and Infrastructure</option>
                              <option value="10">10. Reduced Inequalities</option>
                              <option value="11">11. Sustainable Cities and Communities</option>
                              <option value="12">12. Responsible Consumption and Production</option>
                              <option value="13">13. Climate Action</option>
                              <option value="14">14. Life Below Water</option>
                              <option value="15">15. Life On Land</option>
                              <option value="16">16. Peace, Justice and Strong Institutions</option>
                              <option value="17">17. Partnerships for the Goals</option>
                            </Input>
                            <FormFeedback>Please pick at least one goal.</FormFeedback>
                            {validationErrors && validationErrors.volunteerField &&
                              <FormText color="danger">{validationErrors.volunteerField.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <FormGroup>
                            <Label for="days">Select on what days are you available:</Label>
                            <Input
                              type="select"
                              name="days"
                              multiple
                              value={user.days}
                              onChange={(e) => {
                                this.handleMultipleChange(e);
                              }}
                            >
                              <option value="monday">Monday</option>
                              <option value="tuesday">Tuesday</option>
                              <option value="wednesday">Wednesday</option>
                              <option value="thursday">Thursday</option>
                              <option value="friday">Friday</option>
                              <option value="saturday">Saturday</option>
                              <option value="sunday">Sunday</option>
                            </Input>
                            <FormFeedback>Please pick at least one day.</FormFeedback>
                            {validationErrors && validationErrors.days &&
                              <FormText color="danger">{validationErrors.days.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                          </FormGroup>
                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="hours">Start Time:</Label>
                                <Input
                                  type="time"
                                  name="hours"
                                  value={user.hours}
                                  onChange={(e) => { this.handleChange(e); }}
                                />
                                {validationErrors && validationErrors.hours &&
                                  <FormText color="danger">{validationErrors.hours.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                              </FormGroup>
                              <FormFeedback>Please input a valid start time.</FormFeedback>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="hours">End Time:</Label>
                                <Input
                                  type="time"
                                  name="hours"
                                  value={user.hours}
                                  onChange={(e) => { this.handleChange(e); }}
                                />
                                {validationErrors && validationErrors.hours &&
                                  <FormText color="danger">{validationErrors.hours.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                              </FormGroup>
                              <FormFeedback>Please input a valid end time.</FormFeedback>
                            </Col>
                          </Row>
                          <Button color="primary">Save changes</Button>
                        </Form>
                        {this.props.regStatus.error.message &&
                          <Error message={this.props.regStatus.error.message} />
                        }
                      </Col>
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