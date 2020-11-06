import React from 'react';
import './App.css';
import Main from './components/Main'

const url = "https://gabes-music-reviews.herokuapp.com";

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
    fetch(`${url}/logged_in`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      if ( res.logged_in === true) {
      this.setState({ loggedInStatus: true, user: res.user })
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
      this.setState({ loggedInStatus: false })
    })
  }

  render() {
    return (
      <div className="App">
      <Main
      handleLogin={this.handleLogin}
      loggedInStatus={this.state.loggedInStatus}
      handleLogout={this.handleLogout}
      user={this.state.user}/>
      </div>
    );
  }
}

export default App;
