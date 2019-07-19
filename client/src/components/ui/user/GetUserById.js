import React from 'react';
import axios from 'axios';
import { USER_PAGE, RETRIEVE_USER } from 'constants/links.js';
import { withRouter } from 'react-router-dom';

class GetUserById extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      avatarUrl: {
        value: ''
      }
    };
  }
  componentDidMount = async () => {
    const url = RETRIEVE_USER + "?userId=" + this.props.userId;
    await axios.post('/api/TestUser', {
    //await axios.post(url, {
    })
      .then(response => {
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        className='Post__Author'
        onClick={() => {
          this.props.history.push(USER_PAGE + '/' + this.state.id.toString());
        }}>
        <img
          src={this.state.avatarUrl.value}
          className='Post__Author__Avatar'
          alt='avatar'
        />
        <div className='Post__Author__Wrapper'>
          <div className='Post__Author__Username'>{this.state.username}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(GetUserById);
