import React, { Component } from 'react';
import {
  ABOUT_US,
  HOME,
  LOGIN,
  LOGIN_STATUS,
  LOGOUT,
  USER_PAGE,
  UPLOAD_PAGE,
} from 'constants/links.js';
import { HIDDEN } from 'constants/css.js';
import { Link } from 'react-router-dom';
import { SERVER_OK } from 'constants/webCodes.js';

/** The common navbar ui used throughout the application. */
class CustomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userId: null,
    }
  }
  componentDidMount() {
    this.fetchLoginStatus();
  }

  fetchLoginStatus() {
    fetch(LOGIN_STATUS)
      .then(response =>
        response.status === SERVER_OK ? response.json() : null
      )
      .then(status => {
        if (status.isLoggedIn) {
          let userStatus = JSON.parse(status.userData);
          this.setState({userEmail: userStatus.username});
          this.setState({userId: userStatus.id});
        } 
      });
  }

  render() {
    const { userEmail, userId } = this.state;
    const hideIfSignedIn = userEmail ? HIDDEN : null;
    const hideIfSignedOut = !userEmail ? HIDDEN : null;
    console.log("TEST CONSOLE");
    console.log(this.state);
    return (
      <div className="navbar navbar-dark bg-dark">
        <div>
        <Link to={HOME} className="navbar-brand">Home</Link>
        <Link to={ABOUT_US} className="navbar-toggler">About Our Team</Link>
        </div>
        <div className={hideIfSignedOut}>
          <Link to={USER_PAGE + '/' + userId} className="navbar-toggler">Your Page</Link>
          <Link to={UPLOAD_PAGE} className="navbar-toggler">Create New Post</Link>
          <a href={LOGOUT} className="navbar-toggler">Logout</a>
        </div>
        <div className={hideIfSignedIn}>
          <a href={LOGIN} className="navbar-toggler">Login</a>
        </div>
      </div>
     
    );
  }
}
export default CustomNavBar;
