import React, { Component } from 'react';
import {
  Button, FormGroup, Label, Input, Col
} from 'reactstrap';

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
      <Col xl={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
        <h2>LOG IN</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="email"
            onChange={event => this.setState({ email: event.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
        </FormGroup>
        <Button color="primary" block type="button" onClick={() => this.signUP()}>Login</Button>
      </Col>
    );
  }
}

export default Login;
