import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Login from './Login'

class NavBar extends React.Component {

  state = {
    search: false
  }

  render() {
    return (
      <div className="nav-bar">

      <div className="topnav">
      <a href="/home">Home</a>
      <a href="/review">Reviews</a>
      <a href="/login">Login</a>
      <input type="text" placeholder="Search.." />
      </div>
      <Router>
      <Switch>
      <Route path="/login">
        <Login />
      </Route>
      </Switch>
      </Router>

      </div>
    )
  }
}
export default NavBar;
