import React from 'react';
import axios from 'axios';
import data from 'json/user.json';

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
  componentDidMount = () => {
    axios.post("/retrieve-user", {
      userId: this.props.userId,
    })
    // Promise.resolve({
    //   data
    // })
      .then(response => {
        console.log('Test');
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        className='Post__Author'
        onClick={() => {
          this.props.history.push('/userpage/'+ this.state.id.toString);
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

export default GetUserById;
