import React from 'react';

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
