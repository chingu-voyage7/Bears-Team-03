import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

class BusinessRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        companyName: '',
        fiscalCode: '',
        localOfficeddress: '',
        localOffice_country: '',
        localOffice_phone: '',
        mainHQ: '',
        workFields: ''
      }
    }
  }

  render() {
    return (
      <Container className="BusinessRegistrationPage">
        <Form className="form">
          <FormGroup>
            <Label for="city">City:</Label>
            <Input
              type="text"
              name="city"
              label="City"
              placeholder="ExampleCity">
            </Input>
            <FormFeedback>
              Please input your city.
            </FormFeedback>
          </FormGroup>
        </Form>
      </Container>

    );
    }
}

export default BusinessRegistrationPage;
