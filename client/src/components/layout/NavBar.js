import React from 'react'
import PropTypes from 'prop-types'
import {NavDropdown, Navbar,Nav, Form, FormControl, Button} from 'react-bootstrap'
import {logout} from '../../actions/users'
import {connect} from 'react-redux'

function NavBar({logout}) {
  function handleClick(e) {
    e.preventDefault();
    logout();
  }

    return (
        <div>
  <Navbar bg="light" expand="lg">
  <Button variant="outline-success" onClick={handleClick} >Logout</Button>

  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="/users">Users</NavDropdown.Item>
        
      </NavDropdown>
    </Nav>
   
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}

Navbar.propTypes = {
logout: PropTypes.func.isRequired,
}

export default connect(null, {logout})(NavBar)

