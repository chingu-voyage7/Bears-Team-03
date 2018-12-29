import React, { Component } from 'react';
import logo from './logo.svg';
import RegistrationPage from './RegistrationPage'
import BusinessRegistrationPage from './BusinessRegistrationPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationPage />
        <BusinessRegistrationPage />
      </div>
    );
  }
}

export default App;
