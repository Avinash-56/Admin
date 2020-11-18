import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {login} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = async (e) => {
        e.preventDefault()
        login(email, password)

      };

    if(isAuthenticated){
        return <Redirect to='/register'/>
    }  
    return (
    <div className="center_div" >
      <h1 className="large text-primary">Sign In</h1>
      <p>
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <p>email-id: test1@gmail.com , password: 123456</p>
      <form className="" onSubmit={(e) => onSubmit(e)}  >
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
        <input type="submit" className="btn btn-primary btn-block" value="Login" />
      </form>
    </div>
    )
}

Login.propTypes = {
 login: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
    isAuthenticated: state.user.isAuthenticated
}) 

const mapActionToProps = {
    login
}

export default connect(mapStateToProps, mapActionToProps)(Login)
