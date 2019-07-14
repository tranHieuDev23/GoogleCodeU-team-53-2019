import React, { Component } from 'react';
import { RETRIEVE_POSTS } from 'constants/links.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import NewsFeed from 'components/ui/NewsFeed.js';

class Home extends Component {
  constructor(props) {
    super(props);
    const { userStatus } = this.props;
    this.state = {
      userStatus: {
        userEmail: userStatus.userEmail,
        userId: userStatus.userId,
      },
      posts: [],
    }
    this.handleChangePosts = this.handleChangePosts.bind(this);
  }

  handleChangePosts = (newState) => {
    this.setState({posts: newState});
  }

  componentDidMount = async () => {
    var date = new Date();
    var timestamp = date.getTime(); //current time
    const url = RETRIEVE_POSTS + "?maxCreationTime=" + timestamp + "&limit=10";
    await axios
      .post(url, {})
      //.post('/api/TestAPI', {})
      .then(response => {
        const { data } = response;
        if (Array.isArray(data.posts))
          this.setState({ posts: data.posts });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate = () => {
    const { userStatus } = this.props;
    if (userStatus !== this.state.userStatus) {
      this.setState({ userStatus: userStatus });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className='container pt-2'>
        {this.state.userStatus.userEmail ? (
          <div>
            <h1 className='center'>News Feed</h1>
            <NewsFeed 
              userStatus={this.state.userStatus} 
              posts={this.state.posts} 
              onChangePosts={this.handleChangePosts}
            />
          </div>
        ) : (
            <div className='container pt-2'>
              <div className='BigNotification'>
                Please login to continue!!!
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(Home);
