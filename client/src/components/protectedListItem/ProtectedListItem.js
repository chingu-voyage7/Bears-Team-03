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


    clickHandler = (e) => {
      let projectId = this.props.prj._id;
      let applicantId = e.target.closest('li').id;
      let status = e.target.closest('span').id;
      this.props.setApplicantStatus({projectId ,applicantId, status}); // TODO: The update cause a memory leak, must be solved
    }

    deleteHandler = () => {
      let beSure = window.confirm("This will erase your project from our database! Do you want to continue?");
      if(beSure) {
        this.props.deletePrj(this.props.prj._id)
      }
    }

    render() {
      const {prj, editPrj} = this.props;
      const {pending, accepted, rejected} = this.state;
        return (
          <Card className="card-item" >
          <CardBody>
            <div className="flex-container">
              <span className="card-title" >{prj.projectName} - {prj.projectDescription}</span>
              <div className="list-icon info">
                <i className={'fa fa-pen'} onClick={() => editPrj(prj)}></i>      
              </div>
              <div className="list-icon danger">
                <i className={'fa fa-window-close'}  onClick={this.deleteHandler}></i>      
              </div>
            </div>

            <hr/>
            <div className="flex-footer">
            <ul className="card-title-details">
              {pending.map(applicant => 
                                      (<li 
                                        key={applicant.applicantInfo._id}  
                                        id={applicant.applicantInfo._id}
                                       >
                                          {applicant.applicantInfo.fullname} - <span>PENDING</span>
                                          <span  id="accept" onClick={this.clickHandler} className="list-icon confirm">
                                            <i className={'fa fa-check'}></i>      
                                          </span>
                                          <span id="reject" onClick={this.clickHandler} className="list-icon danger">
                                            <i className={'fa fa-times'}></i>      
                                          </span>
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