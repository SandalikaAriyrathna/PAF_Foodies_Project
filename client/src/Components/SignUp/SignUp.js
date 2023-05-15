import React, { Component } from 'react';
import './SignUp.css';
import { storage, auth } from '../firebase';
import mainLogo from '../../assets/Foodies.png';
import { useNavigate } from 'react-router-dom';
import './register.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: null,
      name: null,
      userName: null,
      password: null,
    };
    this.navigate = this.navigate.bind(this);
  }
  navigate() {
    const { history } = this.props;
    history.push('/');
  }

  newSignUp = () => {
    console.log(this.state);

    auth
      .createUserWithEmailAndPassword(this.state.emailId, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);

        let payload = {
          userId: user.uid,
          userName: this.state.userName,
          name: this.state.name,
          profileImage: '',
        };
        console.log(payload);

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        };

        fetch('http://localhost:8080/users', requestOptions)
          .then((response) => response.json())

          .then((data) => {
            console.log(data);

            localStorage.setItem('users', JSON.stringify(user));
            window.location = '/';
          })
          .catch((error) => {});

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  render() {
    return (
      <div className="register">
        <div className="card">
          <div className="left">
            <img src={mainLogo} />
            <p>Discover New Cuisines, Hidden gems and mouth-watering food</p>
            <span>Do you have an account?</span>
            <a href="/">
              <button>Login</button>
            </a>
          </div>
          <div className="right">
            <h1>Join Us</h1>
            {/* <form onSubmit={this.newSignUp}> */}
            <input
              type="text"
              placeholder="Full Name"
              onChange={(event) => {
                this.state.name = event.currentTarget.value;
              }}
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                this.state.userName = event.currentTarget.value;
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                this.state.emailId = event.currentTarget.value;
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                this.state.password = event.currentTarget.value;
              }}
            />

            <button className="form" onClick={this.newSignUp}>
              Register
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
