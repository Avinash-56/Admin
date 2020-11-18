import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { register } from "../../actions/users";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { Redirect, withRouter } from "react-router-dom";

const Register = ({ register, setAlert, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  if (!isAuthenticated) {
    history.push("/");
  }

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password do not match");
    } else {
      register({ name, email, password });
    }
    setFormData({ name: "", email: "", password: "", password2: "" });
  };
  return (
    <div className="center_div">
      <h1 className="large text-primary">Register</h1>
      <p>
        <i className="fas fa-user"></i> As an admin you can create user accounts here.
        To view or delete a user please use the Dropdown above 
      </p>
      <form className="" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Register"
        />
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapActionToProps = {
  register,
  setAlert,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Register));
