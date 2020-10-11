import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginErrors: "",
      signUpErrors: "",
      signup: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
     })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    const { username, password } = this.state;
    console.log(username, password)
    fetch("http://localhost:3000/registrations", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.status === "created") {
          this.props.handleSuccessfulAuth(res);
        }
      })
  }

  handleLoginForm = (e) => {
    e.preventDefault()
    let username = e.target.username.value;
    let password = e.target.password.value;
    console.log(username, password)
    fetch("http://localhost:3000/sessions", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.login) {
          this.props.handleSuccessfulAuth(res);
        }
      })
  }

  handleSignUpForm = (e) => {
   e.preventDefault();
   this.setState({ signup: true })
  }

  render() {
    return (
      <div className="login">
      {this.state.signup ? (
        <form onSubmit={this.handleSignUp} className="login-form">
        <h2>Sign Up</h2>
          <label htmlFor="username">Username: </label>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="enter a username"
            className="username"
            name="username"
          />
          <div>
            <label htmlFor="password">password: </label>
            <input
            onChange={this.handleChange}
              type="password"
              placeholder="enter a password"
              name="password"
            />
          </div>
          <div>
          <label> Confirm Password</label>
          <input type="password" placeholder="confirm password" name="password-con"/>
          </div>
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={this.handleLoginForm} className="login-form">
          <h2>Login</h2>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            placeholder="enter a username"
            className="username"
            name="username"
          />
          <div>
            <label htmlFor="password">password: </label>
            <input
              type="password"
              placeholder="enter a password"
              name="password"
            />
          </div>
          <button className="login-btn" type="submit">Login</button>
          <button className="sign-up" onClick={this.handleSignUpForm}>Sign Up</button>
        </form>
      )}
      </div>
    )
  }
}

export default Login
