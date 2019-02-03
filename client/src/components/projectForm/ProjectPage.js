import React from 'react';
import {
  Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import Error from '../ErrorNotification';

import './projectPage.css';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ownerId: this.props.auth.currentUser.fullname,
      dueDate: '',
      startDate: '',
      endDate: '',
      from: '',
      to: '',
      description: '',
      workFields: [],
      address: '',
      country: '',
      email: '',
      phone:'',
      workDays: [],
      projectTimespan: [],
      applicationRequirements: '',
      id: null
    };
  }

  componentDidMount = async () => {
    if (this.props.location.state && this.props.location.state.prj) {
      const {prj} = this.props.location.state;

      let prjTimeSpan = [];
      let startDate, endDate;
      if (prj.startDate) {
        prjTimeSpan.push('start');
        startDate = prj.startDate.split('T')[0]
      }
      if (prj.endDate) {
        prjTimeSpan.push('end');
        endDate = prj.endDate.split('T')[0]
      }
      
      this.setState({
        name: prj.projectName || '',
        ownerId: prj.ownerId || '',
        dueDate: prj.dueDate || '',
        projectTimespan: prjTimeSpan || '',
        startDate: startDate || '',
        endDate: endDate || '',
        from: prj.workingHours[0] || '',
        to: prj.workingHours[1] || '',
        description: prj.projectDescription || '',
        workFields: prj.workFields || '',
        address: prj.projectLocationAddress || '',
        country: prj.projectLocationCountry || '',
        email: prj.email || '',
        phone:prj.phoneContact || '',
        workDays: prj.workDays || '',
        applicationRequirements: prj.applicationRequirements || '',
        id: prj._id || null
      });
    }
  }

  componentWillUnmount () {
    if(this.props.prjStatus.error.validationErrors) {
      this.props.resetErr();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    const projectData = {...this.state};
    delete projectData.projectTimespan;
    delete projectData.user;
    
    this.state.id ?
    this.props.edit(projectData, this.props.history) :
    this.props.publish(projectData, this.props.history) ;

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

  handleCheckboxes = (e) => {
    const values = this.state[e.target.name];
    const tempValues = [...values];
    const elPos = tempValues.indexOf(e.target.value);
    // eslint-disable-next-line no-unused-expressions
    elPos === -1
      ? tempValues.push(e.target.value)
      : tempValues.splice(elPos, 1);
    this.setState({
      [e.target.name]: [...tempValues],
    });
  }

  render() {
    const { validationErrors } = this.props.prjStatus.error;

    const {
      name, ownerId, dueDate, from, to, description, workFields, address, country, email, phone,workDays, startDate, endDate, projectTimespan, applicationRequirements
    } = this.state;
    const { currentUser } = this.props.auth;
    return (
      <Col xl={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
        <h2>{this.state.id ? 'EDIT' : 'CREATE'} PROJECT</h2>
        <Container className="form-frame">
          <Form onSubmit={this.handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="dueDate">Due date ( announce )</Label>
                  <Input
                    type="date"
                    name="dueDate"
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
                  <Label for="ownerId">ownerId</Label>
                  <Input
                    type="select"
                    name="ownerId"
                    id="ownerId"
                    defaultValue={ownerId}
                    onChange={this.handleChange}
                  >
                    <option id={currentUser._id}>{currentUser.fullname}</option>
                  </Input>
                  {validationErrors && validationErrors.customer &&
          <FormText color="danger">{validationErrors.customer.map((err, i) => <div key={i}>{err}</div>)}</FormText>}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                <FormGroup check>
                  <Label for="start" check>
                  <Input
                  type="checkbox"
                  id="start"
                  name="projectTimespan"
                  value="start"
                  checked={projectTimespan.includes('start')}
                  onChange={this.handleCheckboxes}
                  /> Start date
                  </Label>
                  </FormGroup>
                  <Input
                    type="date"
                    id="startDate"
                    value={startDate}
                    disabled={!projectTimespan.includes('start')}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                <FormGroup check>
                  <Label  for="end" check>
                  <Input
                  type="checkbox"
                  id="end"
                  name="projectTimespan"
                  value="end"
                  checked={projectTimespan.includes('end')}
                  onChange={this.handleCheckboxes}
                  /> End date
                  </Label>
                  </FormGroup>
                  <Input
                    type="date"
                    id="endDate"
                    value={endDate}
                    disabled={!projectTimespan.includes('end')}
                    onChange={this.handleChange}
                  >
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
                  <Label for="workFields">Involved Fields</Label>
                  <Input
                    type="select"
                    name="workFields"
                    id="workFields"
                    value={workFields}
                    onChange={this.handleMultipleChange}
                    multiple
                  >
                    <option>poverty</option>
                    <option>hunger</option>
                    <option>health</option>
                    <option>gender</option>
                    <option>water</option>
                    <option>energy</option>
                    <option>work</option>
                    <option>innovation</option>
                    <option>inequality</option>
                    <option>sustainability</option>
                    <option>climate</option>
                    <option>oceans</option>
                    <option>earth</option>
                    <option>justice</option>
                    <option>partnership</option>
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
                      name="workDays"
                      value="mon"
                      checked={workDays.includes('mon')}
                      onChange={this.handleCheckboxes}
                    />
                monday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="workDays"
                      value="tue"
                      checked={workDays.includes('tue')}
                      onChange={this.handleCheckboxes}
                    />
                tuesday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="workDays"
                      value="wed"
                      checked={workDays.includes('wed')}
                      onChange={this.handleCheckboxes}
                    />
                wednesday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="workDays"
                      value="thu"
                      checked={workDays.includes('thu')}
                      onChange={this.handleCheckboxes}
                    />
                thursday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="workDays"
                      value="fri"
                      checked={workDays.includes('fri')}
                      onChange={this.handleCheckboxes}
                    />
                friday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="workDays"
                      value="sat"
                      checked={workDays.includes('sat')}
                      onChange={this.handleCheckboxes}
                    />
                saturday
                  </Label>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="workDays"
                      value="sun"
                      checked={workDays.includes('sun')}
                      onChange={this.handleCheckboxes}
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
            <FormGroup>
              <Label for="applicationRequirements">Additional requirements</Label>
              <Input
                type="text"
                id="applicationRequirements"
                placeholder="Specific requirements, warnings, ..."
                value={applicationRequirements}
                onChange={this.handleChange}
              />
            </FormGroup>
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
              {this.state.id ? 'Edit project' : 'Create project'}
            </Button>
          </Form>
          {this.props.prjStatus.error.message && 
        <Error message={this.props.prjStatus.error.message} />
        }
        </Container>
      </Col>
    );
  }
}
