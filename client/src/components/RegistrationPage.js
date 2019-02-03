import React from 'react';
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
import Error from './ErrorNotification';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleMultipleChange = this.handleMultipleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    this.state = {
      user: {
        fullname: '',
        email: '',
        password: '',
        gender: '',
        streetAddress: '',
        city: '',
        stateOrProvince: '',
        zipCode: '',
        country: '',
        phone: '',
        volunteerField: [],
        days: [],
        gravatar: '',
        from: '',
        to: '',
      },
      validate: {
        email: '',
        password: '',
      },
      adult: false,
      terms: false,
      submitted: false,
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

  handleCheckboxChange(event) {
    const { name } = event.target;
    const prev = this.state[name];
    this.setState({ [name]: !prev });
  };

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

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.adult && this.state.terms) {
      try {
        const { fullname, email, password, gender, streetAddress,
          city, stateOrProvince, zipCode, country, phone,
          volunteerField, days, from, to } = this.state.user;
        await this.props.register({
          fullname,
          email,
          password,
          gender,
          streetAddress,
          city,
          stateOrProvince,
          zipCode,
          country,
          phone,
          volunteerField,
          days,
          hours: [from, to]
        });
        if (!this.props.regStatus.isPending && Object.keys(this.props.regStatus.newUser).length !== 0) {
          this.props.history.push('/login');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({ submitted: true });
    }
  }

  componentWillUnmount() {
    if (this.props.regStatus.error.validationErrors) {
      this.props.resetErr();
    }
  }

  render() {
    const { user, validate, adult, terms, submitted } = this.state;
    const { validationErrors } = this.props.regStatus.error;
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
              onChange={this.handleChange}
            />
            <FormFeedback>Please input your full name.</FormFeedback>
            {validationErrors && validationErrors.fullname &&
              <FormText color="danger">{validationErrors.fullname.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
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
            {validationErrors && validationErrors.password &&
              <FormText color="danger">{validationErrors.password.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
          </FormGroup>
          <FormGroup>
            <Label>Profile picture (gravatar email)</Label>
            <Input
              type="email"
              name="gravatar"
              id="gravatar"
              placeholder="myemail@email.com"
              value={user.gravatar}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
            <FormFeedback>
              Uh oh! Looks like there is an issue with your email. Please input a correct email.
            </FormFeedback>
            {validationErrors && validationErrors.gravatar &&
              <FormText color="danger">{validationErrors.gravatar.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender:</Label>
            <Input
              type="select"
              name="gender"
              value={user.gender}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
            {validationErrors && validationErrors.days &&
              <FormText color="danger">{validationErrors.days.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="from">Available from:</Label>
                <Input
                  type="time"
                  name="from"
                  value={user.from}
                  onChange={this.handleChange}
                />
                {validationErrors && validationErrors.hours &&
                  <FormText color="danger">{validationErrors.hours.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
              </FormGroup>
              <FormFeedback>Please input a valid start time.</FormFeedback>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="to">Available until:</Label>
                <Input
                  type="time"
                  name="to"
                  value={user.to}
                  onChange={this.handleChange}
                />
                {validationErrors && validationErrors.hours &&
                  <FormText color="danger">{validationErrors.hours.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
              </FormGroup>
              <FormFeedback>Please input a valid end time.</FormFeedback>
            </Col>
          </Row>
          <FormGroup check>
            <Input
              type="checkbox"
              id="adult"
              name="adult"
              value={adult}
              invalid={submitted && !adult}
              onChange={this.handleCheckboxChange}
            />
            {' '}
            <Label for="adult" check>I am an adult *required</Label>
            <FormFeedback>You need to be an adult to use our service.</FormFeedback>
          </FormGroup>
          <FormGroup check>
            <Input
              type="checkbox"
              id="terms"
              name="terms"
              value={terms}
              invalid={submitted && !terms}
              onChange={this.handleCheckboxChange}
            />
            {' '}
            <Label for="terms" check>I agree to the Terms of Service *required</Label>
            <FormFeedback>You need to accept our Terms of Service to use our service.</FormFeedback>
          </FormGroup>
          <Button color="primary" disabled={!adult || !terms}>Sign Up</Button>
        </Form>
        {this.props.regStatus.error.message &&
          <Error message={this.props.regStatus.error.message} />
        }
      </Container>
    );
  }
}

export default RegistrationPage;
