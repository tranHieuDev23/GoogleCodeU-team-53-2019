import React from 'react';
import { Spin } from 'antd';

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