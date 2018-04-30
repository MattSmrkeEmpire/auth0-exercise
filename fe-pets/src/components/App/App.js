import React, { Component } from 'react';
import {Route, Router} from 'react-router-dom';
import history from './history';

import AuthService from '../AuthService/AuthService'
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard'
import './App.css';

const auth = new AuthService()

const handleAuthentication = props => {
  console.log("hash: ", props.location.hash)
  if (/access_token|id_token|error/.test(props.location.hash)) {
    auth.handleAuthentication()
  }
}

const AuthCallback = props => (
  <div>Authorizing...</div>
)

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Header auth={auth} />
          <div className="container">
            <Route path='/' exact render={props => <Dashboard auth={auth} {...props} />} />
            <Route path='/auth0callback' render={props => {
              handleAuthentication(props)
              return <AuthCallback {...props} />
            }} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
