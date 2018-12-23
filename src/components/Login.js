import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signUP() {
    this.props.login(this.state);
  }

  render() {
    return (
      <div className="block-content in span6" style={{ width: '50%', textAlign: 'center' }}>
        <div className="control-group">
          <div className="controls">
            <label>EMAIL</label>
            <input
              className="form-control"
              type="email"
              style={{ marginRight: '5px' }}
              placeholder="email"
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
        </div>
        <br />
        <div className="controls">
          <label>PASSWORD</label>
          <input
            className="form-control"
            type="password"
            style={{ marginRight: '5px' }}
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
        </div>
        <br />
        <button className="btn btn-primary" type="button" onClick={() => this.signUP()}>
          SIGN UP
        </button>
      </div>
    );
  }
}

export default Login;
