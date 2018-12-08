import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Container, Col,
  Row, Form, FormGroup,
  Label, Input, FormFeedback,
}
  from 'reactstrap';
//import { registrationAction } from './redux/actions/authActions';

function TextInput(props) {
  const {
    value, onChange, name, label,
  } = props;
  return (
    <div>
      <label htmlFor={name}>
        {label}
        <input type="text" value={value} name={name} onChange={onChange} />
      </label>
    </div>
  );
}

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

  validateEmail(event) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(event.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
    this.setState({ validate });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { user } = this.state;
    //dispatch(registrationAction(user));
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            name="fullname"
            label="Full name"
            value={user.fullname}
            onChange={this.handleChange}
          />
          <TextInput
            name="email"
            label="Email"
            value={user.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="gender">
            Gender
            <select name="gender" value={user.gender} onChange={this.handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <TextInput
            name="streetAddress"
            label="Address"
            value={user.streetAddress}
            onChange={this.handleChange}
          />
          <TextInput
            name="city"
            label="City"
            value={user.city}
            onChange={this.handleChange}
          />
          <TextInput
            name="stateOrProvince"
            label="State or Province"
            value={user.stateOrProvince}
            onChange={this.handleChange}
          />
          <TextInput
            name="zipCode"
            label="Zip Code"
            value={user.zipCode}
            onChange={this.handleChange}
          />
          <TextInput
            name="country"
            label="Country"
            value={user.country}
            onChange={this.handleChange}
          />
          <TextInput
            name="phone"
            label="Phone Number"
            value={user.phone}
            onChange={this.handleChange}
          />
          <label htmlFor="volunteerField">
            Global Goals
            <select
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
            </select>
          </label>
          <label htmlFor="days">
            Days
            <select
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
            </select>
          </label>
          <label htmlFor="hours">
            Start Time
            <input
              type="time"
              name="hours"
              value={user.hours}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="hours">
            End Time
            <input
              type="time"
              name="hours"
              value={user.hours}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="adult">
            Adult
            <input
              type="checkbox"
              name="adult"
              value={user.adult}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    registering: state.registration,
  };
}

export default connect(mapStateToProps)(RegistrationPage);
