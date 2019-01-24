import React from 'react';
import { ListGroupItem } from 'reactstrap';

const ProfileListItem = (props) => (
  <ListGroupItem>
    <div className="list-icon">
      <i className={props.icon}></i>
    </div>
    <div className="list-details">
      <span>{props.data}</span>
      <small>{props.title}</small>
    </div>
  </ListGroupItem>
);

export default ProfileListItem;