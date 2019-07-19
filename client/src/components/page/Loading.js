import React from 'react';
import { withRouter } from 'react-router-dom'
import { Spin } from 'antd';
import 'css/index.css';

class Loading extends React.Component {
  render() {
    return (
      <div className='container pt-2'>
        <div className="SpinLogin">
          <Spin size="large"/>
        </div>
      </div>
    );
  }
}

export default Loading;