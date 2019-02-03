import React, { Component } from 'react';
import {
  Button, FormGroup, FormText, Label, Input, Container
} from 'reactstrap';
import Error from './ErrorNotification';

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

  signIn = async () => {
    try {
      await this.props.login(this.state)
    
      if (this.props.auth.isLoggedIn) {
        await this.props.fetchUser();
        this.props.history.push('/search');
      } 
    } catch(error) {
      console.log(error);
    } 
  };

  componentWillUnmount () {
    if(this.props.auth.error.validationErrors) {
      this.props.resetErr();
    }
  }

  render() {
    const {email, password } = this.state;
    const {validationErrors} = this.props.auth.error;
    return (
      <Container className="title-page">
        <h2>LOGIN</h2>
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
        {this.props.auth.error.message && 
        <Error message={this.props.auth.error.message} />
        }
      </Container>
    );
  }
}

export default Login;
