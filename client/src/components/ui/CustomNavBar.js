import React, { Component } from 'react';
import {
  ABOUT_US,
  HOME,
  LOGIN,
  LOGOUT,
  USER_PAGE,
  UPLOAD_PAGE,
  EXPLORE_PAGE,
  EDIT_PROFILE_PAGE
} from 'constants/links.js';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Dropdown, Button } from 'antd';
import { isThisPathUserPage } from 'helpers/StringProcess';
/** The common navbar ui used throughout the application. */
class CustomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userId: null
    };
  }

  componentDidMount = () => {
    const { userStatus } = this.props;
    this.setState({ userEmail: userStatus.userEmail, userId: userStatus.userId });
  };

  componentDidUpdate = () => {
    const { userStatus } = this.props;
    const { userEmail, userId } = this.state;
    if (userStatus.userEmail !== userEmail || userStatus.userId !== userId)
      this.setState({ userEmail: userStatus.userEmail, userId: userStatus.userId });
  };

  handleMenuClick = e => {
    const { userId } = this.state;
    switch (e.key) {
      case 'userpage':
        this.props.history.push(USER_PAGE + '/' + userId);
        break;
      case 'editProfile':
        this.props.history.push(EDIT_PROFILE_PAGE);
        break;
      default:
        break;
    }
  };

  render() {
    const { userEmail, userId } = this.state;
    const isLogin = userEmail ? true : false;
    const { pathname } = this.props.location;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {!isLogin && (
          <Menu.Item key='login'>
            <a href={LOGIN}>
              <Icon type='login' />
              <span className='ml-2'>Login</span>
            </a>
          </Menu.Item>
        )}
        {isLogin && (
          <Menu.Item key='editProfile'>
            <Icon type='edit' />
            Edit your profile
          </Menu.Item>
        )}
        {(isLogin && isThisPathUserPage(pathname)) && (
          <Menu.Item key='userpage-2'>
            <a href={USER_PAGE + '/' + userId}>
              <Icon type='profile' />
              <span className='ml-2'>Your page</span>
            </a>
          </Menu.Item>
        )}
        {(isLogin && !isThisPathUserPage(pathname)) && (
          <Menu.Item key='userpage'>
            <Icon type='profile' />
            Your page
          </Menu.Item>
        )}
        {isLogin && (
          <Menu.Item key='logout'>
            <a href={LOGOUT}>
              <Icon type='logout' />
              <span className='ml-2'>Logout</span>
            </a>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link to={HOME} className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <div className="nav-item">
              <Link to={EXPLORE_PAGE} className="nav-link">Explore</Link>
            </div>
            <div className="nav-item">
              <Link to={ABOUT_US} className="nav-link">About Our Team</Link>
            </div>
          </div>
          <div className="navbar-nav ml-auto">
            <div className="nav-item">
              <Link to={UPLOAD_PAGE} className='nav-link'>Create New Post</Link>
            </div>
            <div className="nav-item">
              <Dropdown overlay={menu}>
                <Button 
                  className="ant-btn-navbar"
                  style={{
                  width: '100%'
                }}>
                  Account <Icon type='user' />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(CustomNavBar);
