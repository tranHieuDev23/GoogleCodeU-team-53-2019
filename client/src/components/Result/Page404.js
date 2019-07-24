import React from 'react';
import { Result, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { HOME } from 'constants/links';

class Page404 extends React.Component {
  render() {
    return (
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={() => this.props.history.push(HOME)}>
            Back Home
          </Button>
        }
      />
    );
  }
}

export default withRouter(Page404);
