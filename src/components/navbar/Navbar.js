import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { children } = this.props;
    return (
      <nav>
        <ul>{React.Children.map(children, child => <li>{child}</li>)}</ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default Navbar;
