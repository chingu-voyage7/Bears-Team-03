import React from 'react'
import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

import './protected-list-item.css';

class ProtectedListItem extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          pending: [],
          accepted: [],
          rejected: []
        };
    }

    componentDidMount() {
      const { prj } = this.props;
      let pending = [];
      let accepted = [];
      let rejected = [];
      prj.applicants.forEach(applicant => {
        switch(applicant.state) {
          case 'pending': 
            pending.push(applicant);
            break;
          case 'accept': 
            accepted.push(applicant);
            break;
          case 'reject': 
            rejected.push(applicant);
            break;
          default: 
            break;
        }
      });

      this.setState({
        pending, accepted, rejected
      });
    }

    clickHandler = async (e) => {
      //let projectId = e.target.closest('div').id;
      let projectId = this.props.prj._id;
      let applicantId = e.target.closest('li').id;
      let status = e.target.id;
      await this.props.setApplicantStatus({projectId ,applicantId, status});
    }

    render() {
      const {prj, editPrj, deletePrj} = this.props;
      const {pending, accepted, rejected} = this.state;
        return (
          <Card className="card-item" >
          <CardBody>
            <div className="flex-container">
              <span className="card-title" >{prj.projectName} - {prj.projectDescription}</span>
              <button onClick={() => editPrj(prj)}>edit</button>
               <button onClick={() => deletePrj(prj._id)}>delete</button>
            </div>
            <hr/>
            <div className="flex-footer">
            <ul className="card-title-details">
              {pending.map(applicant => 
                                      (<li 
                                        key={applicant.applicantInfo._id}  
                                        id={applicant.applicantInfo._id}
                                       >
                                          {applicant.applicantInfo.fullname} - {applicant.state}
                                          <button id="accept" onClick={this.clickHandler}>Accept</button>
                                          <button id="reject" onClick={this.clickHandler}>Reject</button>
                                      </li>)
                                  )}
              </ul>
              <ul className="card-title-details">
              {accepted.map(applicant => 
                                      (<li 
                                        key={applicant.applicantInfo._id}  
                                        id={applicant.applicantInfo._id}
                                       >
                                          {applicant.applicantInfo.fullname} - <span>ACCEPTED</span>
                                      </li>)
                                  )}
              </ul>
              <ul className="card-title-details">
              {rejected.map(applicant => 
                                      (<li 
                                        key={applicant.applicantInfo._id}  
                                        id={applicant.applicantInfo._id}
                                       >
                                          {applicant.applicantInfo.fullname} - <span>REJECTED</span>
                                      </li>)
                                  )}
              </ul>
            </div>
            
          </CardBody>
        </Card>
          )
    }
}

ProtectedListItem.propTypes = {
  prj: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    projectLocationAddress: PropTypes.string,
    projectLocationCountry: PropTypes.string,
    dueDate: PropTypes.string,
    workFields: PropTypes.arrayOf(String),
    ownerId: PropTypes.string
  }),
  editPrj: PropTypes.func,
  deletePrj: PropTypes.func
}

export default ProtectedListItem;