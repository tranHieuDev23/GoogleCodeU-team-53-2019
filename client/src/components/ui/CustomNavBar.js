import React, { Component } from 'react';
import {
  ABOUT_US,
  HOME,
  LOGIN,
  LOGOUT,
  USER_PAGE,
  UPLOAD_PAGE
} from 'constants/links.js';
import { Link } from 'react-router-dom';
import { Menu, Icon, Dropdown, Button } from 'antd';
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
    this.setState({ userEmail: userStatus.userEmail });
    this.setState({ userId: userStatus.userId });
  };

  componentDidUpdate = () => {
    const { userStatus } = this.props;
    if (userStatus.userEmail !== this.state.userEmail) {
      this.setState({ userEmail: userStatus.userEmail });
      this.setState({ userId: userStatus.userId });
    }
    if (userStatus.userId !== this.state.userId)
      this.setState({ userId: userStatus.userId });
  };

  handleMenuClick = e => {
    const { userId } = this.state;
    switch (e.key) {
      case 'userpage':
        this.props.history.push(USER_PAGE + '/' + userId);
        break;
      case 'editProfile':
        // TODO
        break;
      default:
        break;
    }
  };

  render() {
    const { userEmail } = this.state;
    const isLogin = userEmail ? true : false;

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
        {isLogin && (
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
      <div className='navbar navbar-dark bg-primary'>
        <div>
          <Link to={HOME} className='navbar-brand'>
            Home
          </Link>
          <Link to={ABOUT_US} className='navbar-toggler'>
            About Our Team
          </Link>
        </div>
        <div>
          <Link to={UPLOAD_PAGE} className='navbar-toggler'>
            Create New Post
          </Link>
          <Dropdown overlay={menu}>
            <Button>
              Account
              <Icon type='user' />
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}
export default CustomNavBar;
