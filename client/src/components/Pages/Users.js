import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadAllUsers } from '../../actions/users';
import EachUser from './Users_Each'
import {NavDropdown, Navbar,Nav, Form, FormControl, Button} from 'react-bootstrap'

import {Redirect, withRouter} from 'react-router-dom'

const Users = ({users , isAuthenticated, loadAllUsers}) => {
  if(!isAuthenticated){
    <Redirect to='/' />
  }
  useEffect(() => {
    loadAllUsers();
  }, [loadAllUsers]);
  return (
      <div>
    <Nav.Link href="/register">Go Back</Nav.Link>

      <div className="center_div">
   
    <Fragment>
      <h1 className="large text-primary">Admin</h1>
      <p className="lead">
        <i className="fas fa-user"> List of all Users</i>{'  '}
       
      </p>
      <h6> You can delete any user except the admin (test1@gmail.com)  </h6>
      <p>Update functionality couldn't be added due to less time. Apologies</p>
      <div className="posts">
        {users.map(user => (
          <EachUser key={user.id} user={user} />
        ))}
      </div>
    </Fragment>
    </div>
    </div>

    
  );
};

Users.propTypes = {
  users: PropTypes.array,
};

const mapStateToProps = state => ({
users: state.user.users,
isAuthenticated : state.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { loadAllUsers })(Users));