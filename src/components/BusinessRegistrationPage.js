import React, { Component } from 'react';
import {
 Button, Container, Form, FormGroup, Label, Input, FormFeedback, FormText 
} from 'reactstrap';

class BusinessRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        companyName: '',
        taxCode: '',
        localOfficeAddress: '',
        localOffice_country: '',
        localOffice_phone: '',
        mainHQ: '',
        workFields: '',
      },
    };
  }

  render() {
    return (
          <Container className="BusinessRegistrationPage">
              <h2>Business Registration</h2>
              <Form className="form">
                  {/* COMPANY NAME */}
                  <FormGroup>
                      <Label for="companyName">Company Name:</Label>
                      <Input
                          type="text"
                          name="companyName"
                          label="companyName"
                          placeholder="My Company"
                         />
                    </FormGroup>
                  {/* TAX CODE */}
                  <FormGroup>
                      <Label for="taxCode">Fiscal code:</Label>
                      <Input
                          type="text"
                          name="taxCode"
                          label="taxCode"
                          placeholder="123 A"
                         />
                    </FormGroup>
                  {/* ADDRESS */}
                  <FormGroup>
                      <Label for="address">Office address:</Label>
                      <Input
                          type="text"
                          name="address"
                          label="address"
                          placeholder="123 Main Street"
                        >
                        </Input>
                    </FormGroup>
                  {/* COUNTRY */}
                  <FormGroup>
                      <Label for="companyName">Country:</Label>
                      <Input
                          type="text"
                          name="country"
                          label="country"
                          placeholder="My Country"
                         />
                    </FormGroup>
                  {/* PHONE */}
                  <FormGroup>
                      <Label for="phone">Phone number:</Label>
                      <Input
                          type="text"
                          name="phone"
                          label="phone"
                          placeholder="+00-000-000-000"
                         />
                    </FormGroup>
                  {/* MainHQ */}
                  <FormGroup>
                      <Label for="mainHQ">Main HQ:</Label>
                      <Input
                          type="text"
                          name="mainHQ"
                          label="mainHQ"
                          placeholder="My HQ"
                         />
                    </FormGroup>
                  {/* WORK FIELDS */}
                  <FormGroup>
                      <Label for="workFields">What are your work fields?</Label>
                      <Input
                          type="select"
                          name="workFields"
                          multiple
                        >
                          <option value="1">1. No Poverty</option>
                          <option value="2">2. Zero Hunger</option>
                          <option value="3">3. Good Health and Well Being</option>
                          <option value="4">4. Quality Education</option>
                          <option value="5">5. Gender Equality</option>
                          <option value="6">6. Clean Water and Sanitation</option>
                          <option value="7">7. Affordable and Clean Energy</option>
                          <option value="8">8. Decent Work and Economic Growth</option>
                          <option value="9">9. Industry, Innovation and Infrastructure</option>
                          <option value="10">10. Reduced Inequalities</option>
                          <option value="11">11. Sustainable Cities and Communities</option>
                          <option value="12">12. Responsible Consumption and Production</option>
                          <option value="13">13. Climate Action</option>
                          <option value="14">14. Life Below Water</option>
                          <option value="15">15. Life On Land</option>
                          <option value="16">16. Peace, Justice and Strong Institutions</option>
                          <option value="17">17. Partnerships for the Goals</option>
                        </Input>
                    </FormGroup>
                  <Button color="primary">Submit</Button>
                </Form>
            </Container>

    );
  }
}

export default BusinessRegistrationPage;
