import React from 'react';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  componentDidMount = () => {
    setTimeout( () => {
      this.props.history.push("/");
    }, 3000);
  }
  render()  {
    return (
      <div className='container pt-2'>
        <h1>Welcome</h1>
      </div>
    );
  }
}

export default withRouter(Login);