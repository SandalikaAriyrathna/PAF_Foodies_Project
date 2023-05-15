import React, { Component } from 'react';
import { storage, auth } from '../firebase';
import mainLogo from '../../assets/Foodies.png';
import './login.css';

class SignIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: null,
      password: null,
    };
  }

  login = () => {
    // localStorage.setItem("users","admin");
    // window.location.reload();
    auth
      .signInWithEmailAndPassword(this.state.emailId, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        localStorage.setItem('users', JSON.stringify(user));
        window.location.reload();
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  render() {
    return (
      // <div>
      //      <input className="logipage__text" onChange={(event)=>{this.state.emailId=event.currentTarget.value}} type="text" placeholder="Phone number, username, or email" />
      //      <input className="logipage__text" onChange={(event)=>{this.state.password=event.currentTarget.value}}  type="password" placeholder="Password" />
      //      <button className="login__button" onClick={this.login}>Log In</button>
      // </div>
      <div className="login">
        <div className="card">
          <div className="left">
            <img src={mainLogo} />
            <p>Discover New Cuisines, Hidden gems and mouth-watering food</p>
            <br></br>

            <span>Don't you have an account?</span>
            <a href="/register">
              <button>Create Account</button>
              <br></br>
            </a>
          </div>
          <div className="right">
            <h1>Welcome Back</h1>
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(event) => {
                this.state.emailId = event.currentTarget.value;
              }}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(event) => {
                this.state.password = event.currentTarget.value;
              }}
            />

            <button className="asd" type="submit" onClick={this.login}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIN;
