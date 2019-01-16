import React from 'react'
import { Card, CardText, CardBody, CardFooter } from 'reactstrap';
import PropTypes from 'prop-types';

import './listItem.css';
//class ListItem extends Component {
//  render() {
//    return (
  const ListItem = ({prj, detailsPrj, editPrj, deletePrj}) => (
        <Card className="card-item" >
        <CardBody>
          <div className="flex-container">
            <span className="card-title" >{prj.projectName}</span>
            <span className="card-title-details">
            {`${prj.projectLocationAddress} - ${prj.projectLocationCountry} - `}
            </span>
            <button onClick={() => detailsPrj(prj)}>details</button>
            <button onClick={() => editPrj(prj)}>edit</button>
            <button onClick={() => deletePrj(prj._id)}>delete</button>
          </div>
          <hr/>
          <CardText>{prj.projectDescription}</CardText>
        </CardBody>
        <CardFooter className="flex-container footer">
        <div className="flex-container">
            <button className="link-button">{prj.ownerId}</button>
            </div>
            <div className="flex-container">
              {prj.workFields.map((tag, i) => <div key={i} className={`tag ${tag}`}>{tag}</div>)}
            </div>
            <div className="flex-container">
              <time>{prj.dueDate}</time>
            </div>
        </CardFooter>
      </Card>
    )
//  }
//}

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
  editPrj: PropTypes.func.isRequired
}

export default ListItem;