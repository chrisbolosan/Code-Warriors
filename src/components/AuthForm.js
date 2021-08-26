import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return displayName === 'Sign Up' ? (
    <div id="signup-container">
      <form onSubmit={handleSubmit} name={name} id={name}>
        <h1>Create an Account</h1>
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
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  ) : (
    <div className="login-container">
      <form onSubmit={handleSubmit} name={name} id={name}>
        <h1>Sign-In</h1>
        <div>
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
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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
        dispatch(authenticate(info.username, info.password, formName));
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
