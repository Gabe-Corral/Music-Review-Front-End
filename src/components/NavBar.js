import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Login from './Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  render() {
    return (
      <div className="nav-bar">

      <div className="topnav">
      <a href="/">Home</a>
      <a href="/review">Reviews</a>
      {this.props.loggedInStatus ? (
        <a onClick={this.props.handleLogout} href="/">Logout</a>
      ) : (
        <a href="/login">Login</a>
      )}
      <input type="text" placeholder="Search.." />
      </div>
      <Router>
      <Switch>
      <Route path="/login">
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </Route>
      </Switch>
      </Router>

      </div>
    )
  }
}
export default NavBar;
