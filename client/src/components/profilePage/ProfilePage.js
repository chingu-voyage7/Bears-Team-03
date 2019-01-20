import React from 'react';
import './profilePage.css';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props)
    return (
      <div>
        Profile page
      </div>
    );
  }
}

export default ProfilePage; 