import React from 'react';
import {
  Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import './projectPage.css';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      customer: 'myCompany', // first item that fill the select
      dueDate: '',
      from: '',
      to: '',
      description: '',
      involvedFields: [],
      address: '',
      country: '',
      email: '',
      phone:'',
      workDays: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.publish(this.state);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleMultipleChange = (e) => {
    const { name, options } = e.target;
    const value = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      [name]: value,
    });
  }

  handleCheckboxGroup = (e) => {
    const { workDays } = this.state;
    const tempWorkDays = [...workDays];
    const elPos = tempWorkDays.indexOf(e.target.value);
    // eslint-disable-next-line no-unused-expressions
    elPos === -1
      ? tempWorkDays.push(e.target.value)
      : tempWorkDays.splice(elPos, 1);
    this.setState({
      workDays: [...tempWorkDays],
    });
  }

  render() {
    const {validationErrors } = this.props.prjStatus;
    const {
      name, customer, dueDate, from, to, description, involvedFields, address, country, email, phone,workDays,
    } = this.state;
    
    return (
      <Col xl={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
        <h2>CREATE A NEW PROJECT</h2>
        <Container className="form-frame">
          <Form onSubmit={this.handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Due date ( announce )</Label>
                  <Input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.dueDate &&
          <FormText color="danger">{validationErrors.dueDate.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="customer">Customer</Label>
                  <Input
                    type="select"
                    name="customer"
                    id="customer"
                    value={customer}
                    onChange={this.handleChange}
                  >
                    <option>myCompany</option>
                    <option>myOtherCompany</option>
                  </Input>
                  {validationErrors && validationErrors.customer &&
          <FormText color="danger">{validationErrors.customer.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="myProject"
                value={name}
                onChange={this.handleChange}
              />
              {validationErrors && validationErrors.name &&
          <FormText color="danger">{validationErrors.name.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={6}>
                  <Label for="description">Short description</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="description"
                    placeholder="Please provide a brief description (max 200 chars)"
                    maxLength="200"
                    rows="2"
                    style={{ lineHeight: '1.7' }}
                    value={description}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.description &&
          <FormText color="danger">{validationErrors.description.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </Col>
                <Col md={6}>
                  <Label for="involvedFields">Involved Fields</Label>
                  <Input
                    type="select"
                    name="involvedFields"
                    id="involvedFields"
                    value={involvedFields}
                    onChange={this.handleMultipleChange}
                    multiple
                  >
                    <option>Field one</option>
                    <option>Field two</option>
                    <option>Field three</option>
                    <option>Field four</option>
                    <option>Field five</option>
                    <option>Field six</option>
                    <option>Field seven</option>
                    <option>Field eight</option>
                    <option>Field nine</option>
                    <option>Field ten</option>
                  </Input>
                  {validationErrors && validationErrors.involvedFields &&
          <FormText color="danger">{validationErrors.involvedFields.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </Col>
              </Row>
            </FormGroup>
            <Row form>
              <Col md={8}>
                <FormGroup>
                  <Label for="address">Address / area</Label>
                  <Input
                    type="text"
                    id="address"
                    value={address}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.address &&
          <FormText color="danger">{validationErrors.address.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input
                    type="text"
                    id="country"
                    value={country}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.country &&
                    <FormText color="danger">{validationErrors.country.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
            </Row>
            <Label for="workDays">Weekly work time</Label>
            <Row>
              <Col md={6} onChange={this.handleTest}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="mon"
                      checked={workDays.includes('mon')}
                      onChange={this.handleCheckboxGroup}
                    />
                monday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="tue"
                      checked={workDays.includes('tue')}
                      onChange={this.handleCheckboxGroup}
                    />
                tuesday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="wed"
                      checked={workDays.includes('wed')}
                      onChange={this.handleCheckboxGroup}
                    />
                wednesday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="thu"
                      checked={workDays.includes('thu')}
                      onChange={this.handleCheckboxGroup}
                    />
                thursday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="fri"
                      checked={workDays.includes('fri')}
                      onChange={this.handleCheckboxGroup}
                    />
                friday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="sat"
                      checked={workDays.includes('sat')}
                      onChange={this.handleCheckboxGroup}
                    />
                saturday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="workDays"
                      value="sun"
                      checked={workDays.includes('tue')}
                      onChange={this.handleCheckboxGroup}
                    />
                sunday
                  </Label>
                  {validationErrors && validationErrors.workDays &&
          <FormText color="danger">{validationErrors.workDays.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
              <Col md={3} sm={6}>
                <FormGroup>
                  <Label for="from">From</Label>
                  <Input
                    type="time"
                    id="from"
                    value={from}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.from &&
          <FormText color="danger">{validationErrors.from.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
              <Col md={3} sm={6}>
                <FormGroup>
                  <Label for="to">To </Label>
                  <Input
                    type="time"
                    id="to"
                    value={to}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.to &&
          <FormText color="danger">{validationErrors.to.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <h6>CONTACTS</h6>
            <Row form>
              <Col md={8}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  {validationErrors && validationErrors.email &&
          <FormText color="danger">{validationErrors.email.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    type="text"
                    id="phone"
                    pattern="\d+"
                    value={phone}
                    onChange={this.handleChange}
                  />
                  <FormText color="muted">
                  Insert number only
                  </FormText>
                  {validationErrors && validationErrors.phone &&
          <FormText color="danger">{validationErrors.phone.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
            </Row>
            <Button
              color="secondary"
              type="submit"
              block
            >
              Publish the announce
            </Button>
          </Form>
        </Container>
      </Col>
    );
  }
}
