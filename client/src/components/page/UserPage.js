import React, { Component } from 'react';
import { RETRIEVE_POSTS } from 'constants/links.js';
import axios from 'axios';
import NewsFeed from 'components/ui/NewsFeed.js';
import { withRouter } from 'react-router-dom';
import { addParamToUrl } from 'helpers/FetchServer.js';

class UserPage extends Component {
  constructor(props) {
    super(props);
    const { userStatus } = this.props;
    this.state = {
      userStatus: {
        userEmail: userStatus.userEmail,
        userId: userStatus.userId,
      },
      posts: [],
      userIdParam: this.props.match.params.userId
    }
    this.handleChangePosts = this.handleChangePosts.bind(this);
  }

  handleChangePosts = (newState) => {
    this.setState({posts: newState});
  }

  componentDidMount = async () => {
    var date = new Date();
    var timestamp = date.getTime(); //current time
    let url = RETRIEVE_POSTS;
    url = addParamToUrl(url, 'maxCreationTime', timestamp);
    url = addParamToUrl(url, 'limit', 10);
    url = addParamToUrl(url, 'userId', this.state.userIdParam);
    await axios
      .post(url, {})
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
    return (
      <div className='container pt-2'>
        {this.state.userStatus.userEmail ? (
          <div>
            <h1 className='center'>{this.state.userStatus.userEmail} Page</h1>
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

export default withRouter(UserPage);
