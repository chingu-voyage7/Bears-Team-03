import React, { Component } from 'react';
import {
  Button, Collapse,
  Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navbar.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout = async () => {
    await this.props.logout();
    if (!this.props.auth.isLoggedIn) {
      this.props.history.push('/login');
    }
  }
  render() {
    let { isLoggedIn } = this.props.auth;
    return (
      <Navbar color="light" light expand="md" className="fixed-top">
        <NavbarBrand tag={RRNavLink} to="/">Volunteer Manager App</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/search">Search</NavLink>
            </NavItem>
            {
              isLoggedIn ? (
                <>
                  <NavItem>
                    <Button color="primary" tag={Link} to="/prlist">List Prjs</Button>
                  </NavItem>
                  <NavItem>
                    <Button color="primary" tag={Link} to="/create-project">Create project</Button>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/profile">My profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.handleLogout}>Logout</NavLink>
                  </NavItem>
                </>
              ) : (
                  <>
                    <NavItem>
                      <NavLink tag={Link} to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <Button color="primary" tag={Link} to="/login">Login</Button>
                    </NavItem>
                  </>
                )
            }
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default withRouter(Navigation);
