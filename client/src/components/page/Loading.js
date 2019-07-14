import React from 'react';
import { withRouter } from 'react-router-dom'
import { Spin } from 'antd';
import 'css/index.css';

class Loading extends React.Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.history.push("/");
    }, 2000);
  }
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

export default withRouter(Loading);