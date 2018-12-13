import React from 'react';
import {
  Container, Col, Row, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import './projectPage.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      customer: '',
      dueDate: '',
      from: '',
      to: '',
      description: '',
      involvedFields: [],
      placeOfWork: '',
      workDays: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(this.state);
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
    const {
      name, customer, dueDate, from, to, description, involvedFields, placeOfWork, workDays,
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
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="placeOfWork">Place of work</Label>
              <Input
                type="text"
                name="placeOfWork"
                id="placeOfWork"
                value={placeOfWork}
                onChange={this.handleChange}
              />
            </FormGroup>
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
