import React from 'react'
import PropTypes from 'prop-types'
import Register from '../auth/Register'
import NavBar from './NavBar' 

function Dashboard(props) {
    return (
        <div>
            <NavBar/>
            <Register/>
            
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard

