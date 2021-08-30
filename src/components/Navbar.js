import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const Navbar = ({ isLoggedIn, handleClick, userId, auth }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(auth);
  }, [auth]);

  console.log('Navbar: ', user);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <p className="navbar-brand">Code Warriors</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">
                <p className="nav-link">Home</p>
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to={{
                      pathname: `/user/${user._id}`,
                      state: { user: user },
                    }}
                  >
                    <p className="nav-link">Profile</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/">
                    <p className="nav-link" onClick={handleClick}>
                      Logout
                    </p>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <p className="nav-link">Login</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">
                    <p className="nav-link">Signup</p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth._id,
    userId: state.auth._id,
    auth: state.auth,
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
