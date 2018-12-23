import React from 'react';
import { connect } from 'react-redux';



import {
  Button,
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from 'reactstrap';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleMultipleChange = this.handleMultipleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        fullname: '',
        email: '',
        password: '',
        adult: '',
        gender: '',
        streetAddress: '',
        city: '',
        stateOrProvince: '',
        zipCode: '',
        country: '',
        phone: '',
        volunteerField: [''],
        days: [''],
        hours: [''],
      },
      validate: {
        email: '',
        password: '',
        fullname: '',
        adult: '',
        gender: '',
        streetAddress: '',
        city: '',
        stateOrProvince: '',
        zipCode: '',
        country: '',
        phone: '',
        volunteerField: '',
        days: '',
        hours: '',
      },
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleMultipleChange(event) {
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

  validateRequired(event) {
    const { name } = event.target;
    const { validate, user } = this.state;
    if (user[name].length > 0) {
      validate[name] = 'has-success';
    } else {
      validate[name] = 'has-danger';
    }
    this.setState({ validate });
  }

  // A lot of ideas and implementations came from here:
  // https://alligator.io/react/fancy-forms-reactstrap/
  validateEmail(event) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(event.target.value)) {
      validate.email = 'has-success';
    } else {
      validate.email = 'has-danger';
    }
    this.setState({ validate });
  }

  // Only accept password that are at least 6 characters long
  validatePassword(event) {
    const pwdRex = /^.{6,}$/;
    const { validate } = this.state;
    if (pwdRex.test(event.target.value)) {
      validate.password = 'has-success';
    } else {
      validate.password = 'has-danger';
    }
    this.setState({ validate });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.register(this.state.user);
  }

  render() {
    const { user, validate } = this.state;
    return (
      <Container className="RegistrationPage">
        <h2>Sign Up</h2>
        <Form className="form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="myemail@email.com"
              value={user.email}
              valid={validate.email === 'has-success'}
              invalid={validate.email === 'has-danger'}
              onChange={(e) => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
            <FormFeedback>
              Uh oh! Looks like there is an issue with your email. Please input a correct email.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Full name:</Label>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Example Joe"
              value={user.fullname}
              invalid={validate.fullname === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your full name.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={user.password}
              valid={validate.password === 'has-success'}
              invalid={validate.password === 'has-danger'}
              onChange={(e) => {
                this.validatePassword(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback valid>That is a good password! :)</FormFeedback>
            <FormFeedback>Please input a password that is at least 6 characters long.</FormFeedback>
            <FormText>At least 6 characters long</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender:</Label>
            <Input type="select" name="gender" value={user.gender} onChange={this.handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Input>
            <FormFeedback>Please input your gender.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Address:</Label>
            <Input
              type="name"
              name="streetAddress"
              label="Address"
              placeholder="123 Main Street"
              value={user.streetAddress}
              invalid={validate.streetAddress === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your address.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="city">City:</Label>
            <Input
              type="text"
              name="city"
              label="City"
              placeholder="ExampleCity"
              value={user.city}
              invalid={validate.city === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your city.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="stateOrProvince">State/Province/Region:</Label>
            <Input
              type="text"
              name="stateOrProvince"
              label="State or Province"
              placeholder="exampleState"
              value={user.stateOrProvince}
              invalid={validate.stateOrProvince === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your state.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="zipCode">ZIP:</Label>
            <Input
              type="text"
              name="zipCode"
              label="Zip Code"
              placeholder="exampleZIP"
              value={user.zipCode}
              invalid={validate.zipCode === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your ZIP code.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="country">Country/Region:</Label>
            <Input
              type="text"
              name="country"
              label="Country"
              placeholder="exampleCountry"
              value={user.country}
              invalid={validate.country === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your country.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone number:</Label>
            <Input
              type="text"
              name="phone"
              label="Phone Number"
              placeholder="+36-20-233-7788"
              value={user.phone}
              invalid={validate.phone === 'has-danger'}
              onChange={(e) => {
                this.validateRequired(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>Please input your phone number.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="volunteerField">What Global Goals do you want to support?</Label>
            <Input
              type="select"
              name="volunteerField"
              multiple
              value={user.volunteerField}
              onChange={this.handleMultipleChange}
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
          </FormGroup>
          <FormGroup>
            <Label for="days">Select on what days are you available:</Label>
            <Input
              type="select"
              name="days"
              multiple
              value={user.days}
              onChange={this.handleMultipleChange}
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
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="hours">Start Time:</Label>
                <Input type="time" name="hours" value={user.hours} onChange={this.handleChange} />
              </FormGroup>
              <FormFeedback>Please input a valid start time.</FormFeedback>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="hours">End Time:</Label>
                <Input type="time" name="hours" value={user.hours} onChange={this.handleChange} />
              </FormGroup>
              <FormFeedback>Please input a valid end time.</FormFeedback>
            </Col>
          </Row>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                value={user.adult}
                invalid={validate.streetAddress === 'has-danger'}
                onChange={(e) => {
                  this.validateRequired(e);
                  this.handleChange(e);
                }}
              />
{' '}
              I am an adult
            </Label>
            <FormFeedback>You need to be an adult to use our service.</FormFeedback>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" value={user.adult} onChange={this.handleChange} />
{' '}
I agree to
              the Terms of Service
</Label>
            <FormFeedback>You need to accept our Terms of Service to use our service.</FormFeedback>
          </FormGroup>
          <Button color="primary">Sign Up</Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    registering: state.registration,
  };
}

export default connect(mapStateToProps)(RegistrationPage);
