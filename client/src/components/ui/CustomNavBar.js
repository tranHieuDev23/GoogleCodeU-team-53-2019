import React, { Component } from 'react';
import {
  ABOUT_US,
  HOME,
  LOGIN,
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
      userEmail: '',
      userId: null,
    }
  }

  componentDidMount = () => {
    const { userStatus } = this.props;
    this.setState({ userEmail: userStatus.userEmail });
    this.setState({ userId: userStatus.userId });
  }

  componentDidUpdate = () => {
    const { userStatus } = this.props;
    if (userStatus.userEmail !== this.state.userEmail) {
      this.setState({ userEmail: userStatus.userEmail });
      this.setState({ userId: userStatus.userId });
    }
    if (userStatus.userId !== this.state.userId)
      this.setState({ userId: userStatus.userId });
  }

  render() {
    const { userEmail, userId } = this.state;
    const hideIfSignedIn = userEmail ? HIDDEN : null;
    const hideIfSignedOut = !userEmail ? HIDDEN : null;
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
