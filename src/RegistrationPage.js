import React from 'react';
import { connect } from 'react-redux';
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
