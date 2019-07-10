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
      <h1>Welcome</h1>
    );
  }
}

export default withRouter(Login);