import React from 'react';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
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
