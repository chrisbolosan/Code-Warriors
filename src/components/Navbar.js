import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, handleClick, userId, auth }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  return (
    <nav id="navbar-container">
      <div id="navbar" className="flex">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <p id="navbar-brand">Code Warriors</p>
        </Link>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="dropdown">+</span>
        </button> */}
        { isLoggedIn? (
          <div id="nav-items" className="flex">
            <p className="nav-item">
              <Link to ="/"  style={{ textDecoration: 'none' }}>
                Home
              </Link>
            </p>
            <p className="nav-item">
              <Link to={{
              pathname: `/user/${user._id}`,
              state: { user: user }
              }} style={{ textDecoration: 'none' }}>
                Profile
              </Link>
            </p>
            <p className="nav-item" onClick={handleClick}>
              <Link to="/">
                Logout
              </Link>
            </p>
          </div>
        ) : (
          <div id="nav-items" className="flex">
            <p className="nav-item">
              <Link to ="/" style={{ textDecoration: 'none' }}>
                Home
              </Link>
            </p>
            <p className="nav-item">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </p>
            <p className="nav-item">
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Signup
              </Link>
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth._id,
    userId: state.auth._id,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
