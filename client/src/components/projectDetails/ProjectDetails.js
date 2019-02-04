import React from 'react'
import {
  Card, Button, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardFooter,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge, Container
} from 'reactstrap';

import './projectDetails.css';

class ProjectDetails extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      prj : {
        applicants: [] // to reduce boilerplate ( check against applicanst existence no needed anymore)
      }
    }
  }

  componentDidMount() {
    const {prj, prj_id} = this.props.location.state;

    if(prj) {
      prj.startDate = this.formatDate(prj.startDate);
      prj.endDate = this.formatDate(prj.endDate);
      prj.dueDate = this.formatDate(prj.dueDate);
      this.setState({prj});
    } else {
      this.setState({prj: prj_id}); // fetch prj
    }
  }

  formatDate = (ISODate) => {
    let newDate = new Date(ISODate);
    return `${newDate.getFullYear()} / ${newDate.getMonth() +1} / ${newDate.getDate()}`
  }

  handleApplication = () => {
    this.props.toggleSubscription(this.state.prj._id)
      .then(() => {
        const {newProject} = this.props.prjStatus;
        if (newProject) {
          if(newProject.startDate) 
          newProject.startDate = this.formatDate(newProject.startDate);

          if(newProject.endDate) 
          newProject.endDate = this.formatDate(newProject.endDate);

          if(newProject.dueDate) 
          newProject.dueDate = this.formatDate(newProject.dueDate);

          this.setState({
            prj: newProject
          })
        } else {
          console.log('something went wrong');
        }
      });    
  }

  render() {
    const {isLoggedIn}  = this.props.auth;
    const {applicationRequirements, applicants, email, ownerId, phoneContact, projectDescription, projectLocationAddress, projectLocationCountry, projectName, workDays, workFields, workingHours, startDate, endDate, dueDate} = this.state.prj;
    return (
      <Container className="title-page">
    <CardGroup>
      <Card>
        <CardBody>
          <CardSubtitle>PROJECT SPECS</CardSubtitle>
          <div className="tag-stripe">
                {workFields && workFields.map((el) => <Badge key={el} className={`tag ${el}`}>{el}</Badge>)}
          </div>
          <CardTitle>{projectName}</CardTitle>
          <CardText>{projectDescription}</CardText>
          <hr/>
          <small>ADDITIONAL REQUIREMENTS: </small>
          <CardText>{applicationRequirements}</CardText>
        </CardBody>
        <CardFooter>
          <Button 
                color="primary"
            block
            disabled={!isLoggedIn}
            onClick={this.handleApplication} 
            >Apply for the role!</Button>
        </CardFooter>
      </Card>
      <Card>
        <Card>
          <CardBody>
          <CardSubtitle>AVAILABLE WORK TIME: </CardSubtitle>
          <ListGroupItem>
              <ListGroupItemHeading>Dates</ListGroupItemHeading>
              <ListGroupItemText>
          <span>Project Start: </span> {startDate ? startDate : '/'}
          <br/>
          <span>Project Ends: </span> {endDate ? endDate : '/'}
              </ListGroupItemText>
            </ListGroupItem>
          <ListGroup>
            <ListGroupItem>
              <ListGroupItemHeading>Days </ListGroupItemHeading>
              <ListGroupItemText>{workDays && workDays.map((el, i) => i===workDays.length-1 ?
        `${el}`:
        `${el}, ` )}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Hours</ListGroupItemHeading>
              <ListGroupItemText>
              {workingHours && `From: ${workingHours[0]} to ${workingHours[1]}`}
              </ListGroupItemText>
            </ListGroupItem>
          </ListGroup>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardSubtitle>WORKPLACE</CardSubtitle>
            <CardText>
              <span>{projectLocationAddress}</span>
              <span>{projectLocationCountry}</span>
            </CardText>
          </CardBody>
        </Card>
      </Card>
    </CardGroup>
    <CardGroup>
        <Card>
          <CardBody>
            <CardSubtitle>Already applying: {applicants.length}</CardSubtitle>
            <ListGroup flush>
            { applicants.map((guy) => 
              <ListGroupItem key={guy._id}>{guy.applicantInfo.fullname}</ListGroupItem>)}
            </ListGroup>
          </CardBody>
      </Card>
      <Card>
          <CardBody>
            <CardSubtitle>Publisher info:</CardSubtitle>
            <ListGroup flush>
            <ListGroupItem>{ownerId}</ListGroupItem>
            <ListGroupItem>{email}</ListGroupItem>
            {phoneContact && <ListGroupItem>{phoneContact}</ListGroupItem>}
            </ListGroup>
          </CardBody>
      </Card>
      <Card>
          <CardBody>
            <CardSubtitle>Announce due date</CardSubtitle>
            <CardText>
              {dueDate ? dueDate : '/'}
            </CardText>
          </CardBody>
      </Card>
    </CardGroup>
      </Container>
    );
  }
}

export default ProjectDetails;