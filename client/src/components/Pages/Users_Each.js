import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {deleteUser} from '../../actions/users'

const EachUser = ({ user: { _id, name, email, password, Date }, deleteUser }) => (
  <div class="post bg-white p-1 my-1">
    <div>
      <h4>{name}</h4>
    </div>
    <div>
      <h4>{email}</h4>
    </div>
    <div>Registered on {Date}</div>
    <div>
      <Fragment>
        <button
          onClick={(e) => deleteUser(_id)}
          type="button"
          class="btn btn-danger"
        >
          Delete
          <i class="fas fa-times"></i>
        </button>
        {' '}
        <button
          onClick={(e) => deleteUser(_id)}
          type="button"
          class="btn btn-info"
        >
          Update
          <i class="fas fa-times"></i>
        </button>
      </Fragment>
    </div>
  </div>
);

EachUser.propTypes = {
  users: PropTypes.array,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});
export default connect(mapStateToProps, {deleteUser})(EachUser);
