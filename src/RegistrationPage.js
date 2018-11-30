import React from 'react';

function TextInput(props) {
  const {
    value, onChange, name, label,
  } = props;
  return (
    <label htmlFor={name}>
      {label}
      <input type="text" value={value} name={name} onChange={onChange} />
    </label>
  );
}

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullname: '',
        email: '',
        password: '',
        adult: '',
        gender: '',
        addressData: {
          streetAddress: '',
          city: '',
          stateOrProvince: '',
          zipCode: '',
          country: '',
        },
        phone: '',
        volunteerField: [''],
        timeAvailability: {
          days: [''],
          hours: [''],
        },
      },
    };
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default RegistrationPage;
