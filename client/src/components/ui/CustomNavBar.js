import React, { Component } from 'react';
import { SERVER_OK } from 'constants/webCodes.js';
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


/** The common navbar ui used throughout the application. */
class CustomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      id: null,
    }
  }
  componentDidMount() {
    this.fetchLoginStatus();
  }

  /** Fetches the login status of the current user. */
  fetchLoginStatus() {
    fetch(LOGIN_STATUS)
      .then(response =>
        response.status === SERVER_OK ? response.json() : null
      )
      .then(status => {
        if (status) {
          const userData = JSON.parse(status.userData);
          this.setState({userEmail: userData.username});
          this.setState({userId: userData.id});
        } else {
          console.log('Error: Server is unavailable.');
        }
      })
      .catch(status => {
        
      });
  }

  render() {
    const { userEmail, userId } = this.state;
    const hideIfSignedIn = userEmail ? HIDDEN : null;
    const hideIfSignedOut = !userEmail ? HIDDEN : null;
    console.log("TEST CONSOLE");
    return (
      <div className="navbar navbar-dark bg-dark">
        <div>
        <Link to={HOME} className="navbar-brand">Home</Link>
        <Link to={ABOUT_US} className="navbar-tog gler">About our team</Link>
        </div>
        <div className={hideIfSignedOut}>
          <Link to={USER_PAGE + '/' + userId} className="navbar-toggler">Your Page</Link>
          <Link to={UPLOAD_PAGE} className="navbar-toggler">Create new post</Link>
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
