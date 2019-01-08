import React, { Component } from 'react';
import {
  Button, FormGroup, FormText, Label, Input, Col
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]:e.target.value
    });
  };

  signIn = () => {
    this.props.login(this.state);
  };

  render() {
    const {email, password } = this.state;
    const {validationErrors} = this.props.auth;
    return (
      <Col xl={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
        <h2>LOG IN</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="email"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          {validationErrors && validationErrors.email &&
          <FormText color="danger">{validationErrors.email.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={this.handleChange}
          />
          {validationErrors && validationErrors.password &&
          <FormText color="danger">{validationErrors.password.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
        </FormGroup>
        <Button color="primary" block type="button" onClick={this.signIn}>Login</Button>
      </Col>
    );
  }
}

export default Login;
