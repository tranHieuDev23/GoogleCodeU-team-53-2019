import React from 'react';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';
import { USER_PAGE } from 'constants/links';
import { fetchLoginStatus } from 'helpers/UserStatus';

class LoginPage extends React.Component {
  componentDidMount = async () => {
    const status = await fetchLoginStatus()
    notification.success({
      'message': 'Welcome ' + status.userEmail,
    })
    this.props.history.push(USER_PAGE + '/' + status.userId);
  }

  render() {
    return (
      <div />
    );
  }
}

export default withRouter(LoginPage);