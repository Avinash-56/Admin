import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Dahboard from './components/layout/Dashboard' 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import SetAlert from './components/layout/SetAlert'
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/users'
import Users from './components/Pages/Users'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
 
  return(
  <Provider store={store}>
  <Router>
    <Fragment>
      <SetAlert/>
      <Route exact path='/' component={Login}/>
      <Route exact path='/register' component={Dahboard}/>
      <Route exact path='/users' component={Users}/>
    </Fragment>
  </Router>
  </Provider>
  )
}


export default App;
