import React from 'react'
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd';
import { LOGIN } from 'constants/links';

class PleaseLogin extends React.Component {
  render() {
    return (
      <Result
        status="403"
        title="Please login to continue"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <a href={LOGIN}> <Button type='primary' icon='login'>Login</Button></a>
        }
      />
    )
  }
}

export default withRouter(PleaseLogin);
