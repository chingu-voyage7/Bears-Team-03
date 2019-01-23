import React from 'react';
import './profilePage.css';

class ProfilePage extends React.Component {
  _isMounted = false;

  state = {
    currentUser: {}
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.fetchUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Profile page {this.props.auth.currentUser ? this.props.auth.currentUser.fullname : ''}</h1>
      </div>
    );
  }
}

export default ProfilePage; 