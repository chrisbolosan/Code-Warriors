import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticate, signUpThunk } from '../store';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return displayName === 'Sign Up' ? (
    <div id="signup-container">
      <form onSubmit={handleSubmit} name={name} id={name}>
        <h2>Create an Account</h2>
        <label htmlFor="username">
          <p>Username</p>
        </label>
        <input name="username" type="text" />
        <label htmlFor="password">
          <p>Password</p>
        </label>
        <input name="password" type="password" />
        <label htmlFor="email">
          <p>Email</p>
        </label>
        <input name="email" type="text" />
        <button type="submit">Create an Account</button>
        <small>
          Already have an account? Log in  <Link to="/signup">here</Link>.
        </small>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  ) : (
    <div className="login-container">
      <form onSubmit={handleSubmit} name={name} id={name}>
        <h2>Sign-In</h2>
        <div id="login-form" className="flex">
          <label htmlFor="username">
            <p>Username</p>
          </label>
          <input name="username" type="text" />
          <label htmlFor="password">
            <p>Password</p>
          </label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
        <small>
          Don't have an account? Sign up <Link to="/signup">here</Link>.
        </small>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      if (formName === 'login') {
        const info = {
          username: evt.target.username.value,
          password: evt.target.password.value,
        };
        dispatch(authenticate(info.username, info.password, formName));
      } else {
        const info = {
          username: evt.target.username.value,
          password: evt.target.password.value,
          email: evt.target.email.value,
        };
        dispatch(
          signUpThunk(info.username, info.password, info.email, formName)
        );
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
