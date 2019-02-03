import React from 'react'
import { Card, CardText, CardBody, CardFooter } from 'reactstrap';
import PropTypes from 'prop-types';

import './listItem.css';

const ListItem = ({ prj, detailsPrj }) => (
  <Card className="card-item" >
    <CardBody>
      <div className="flex-container">
        <div>
          <span className="card-title" >{prj.projectName}</span>
          <span className="card-title-details">
            {`${prj.projectLocationAddress} - ${prj.projectLocationCountry} - `}
          </span>
        </div>
        <div className="list-icon info">
          <span> Details </span>
          <i className='fa fa-info' onClick={() => detailsPrj(prj)}></i>
        </div>
      </div>
      <hr />
      <CardText>{prj.projectDescription}</CardText>
    </CardBody>
    <CardFooter className="flex-container">
      <button className="link-button">{prj.ownerId}</button>
      <div className="flex-container">
        {prj.workFields.map((tag, i) => <div key={i} className={`tag ${tag}`}>{tag}</div>)}
      </div>
      <time>{prj.dueDate}</time>
    </CardFooter>
  </Card>
)

ListItem.propTypes = {
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

export default ListItem;