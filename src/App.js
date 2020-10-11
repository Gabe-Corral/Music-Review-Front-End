import React from 'react';
import './App.css';
import NavBar from './components/NavBar'

const url = "http://localhost:3000";

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: false,
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    fetch("http://localhost:3000/logged_in", {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      if ( res.logged_in === true) {
      this.setState({ loggedInStatus: true, user: res.user })
      console.log(res)
      } else {
        this.setState({ loggedInStatus: false })
      }
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: true,
      user: data.user
    });
  }

  handleLogout(e) {
    e.preventDefault()
    fetch(`${url}/logout`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({ loggedInStatus: false })
    })
  }

  render() {
    return (
      <div className="App">
      <NavBar
      handleLogin={this.handleLogin}
      loggedInStatus={this.state.loggedInStatus}
      handleLogout={this.handleLogout}/>
      </div>
    );
  }
}

export default App;
