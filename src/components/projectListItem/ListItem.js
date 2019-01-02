import React, { Component } from 'react'
import { Card, CardText, CardBody, CardFooter } from 'reactstrap';

import './listItem.css';
class ListItem extends Component {
  render() {
    return (
        <Card className="card-item" >
        <CardBody>
          <div className="flex-container">
            <span className="card-title" >MY SUPER PROJECT</span>
            <span className="card-title-details">Birmingham, Midlands - UK -</span>
          </div>
          <hr/>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.
          Some quick example text to build on the card title and make up the bulk of the card's content.
          </CardText>
        </CardBody>
        <CardFooter className="flex-container footer">
        <div className="flex-container">
            <button className="link-button">BigBawsCompany</button>
            </div>
            <div className="flex-container">
              <div className="tag poor">Poor</div>
              <div className="tag water">Water</div>
            </div>
            <div className="flex-container">
              <time>03/05/2018</time>
            </div>
        </CardFooter>
      </Card>
    )
  }
}

export default ListItem;