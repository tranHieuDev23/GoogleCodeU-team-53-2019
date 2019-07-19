import React, { Component } from 'react';
import NewFeedWrapper from 'components/NewFeedWrapper';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from 'helpers/LoadPost';
import { fetchUser } from 'helpers/LoadUser';

class UserPage extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const timestamp = date.getTime(); //current time
    const { userStatus } = this.props;
    this.state = {
      userStatus: {
        userEmail: userStatus.userEmail,
        userId: userStatus.userId,
      },
      posts: [],
      userIdParam: this.props.match.params.userId,
      thisUserEmail: '',
      minTimestamp: timestamp,
    }
    this.loadMorePost = this.loadMorePost.bind(this);
  }

  componentDidMount = async () => {
    // get user email
    const user = await fetchUser(this.state.userIdParam);
    this.setState({ thisUserEmail: user.username });
    // get Posts
    const date = new Date();
    const timestamp = date.getTime(); //current time
    const newPosts = await fetchPosts(timestamp, 10, '', this.state.userIdParam, '')
    if (newPosts != null) {
      let newMinTimestamp = this.state.minTimestamp;
      this.setState({ posts: newPosts });
      for (const [index, post] of newPosts.entries())
        newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
      this.setState({ minTimestamp: newMinTimestamp - 1 });
    }
  }

  componentDidUpdate = () => {
    const { userStatus } = this.props;
    if (userStatus !== this.state.userStatus) {
      this.setState({ userStatus: userStatus });
    }
    if (this.state.userIdParam !== this.props.match.params.userId)
      this.setState({userIdParam: this.props.match.params.userId});
  }

  loadMorePost = async () => {
    const morePosts = await fetchPosts(this.state.minTimestamp, 10, '', this.state.userIdParam, '');
    if (morePosts != null) {
      let newMinTimestamp = this.state.minTimestamp;
      for (const [index, post] of morePosts.entries())
        newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
      this.setState({ minTimestamp: newMinTimestamp - 1 });
      let newPosts = [...this.state.posts];
      newPosts.push(...morePosts);
      this.setState({ posts: newPosts });
    }
  }

  render() {
    return (
      <div className='container pt-2'>
        {this.state.userStatus.userEmail ? (
          <div>
            <h1 className='center'>{this.state.thisUserEmail} Page</h1>
            <NewFeedWrapper
              userStatus={this.state.userStatus}
              posts={this.state.posts}
              handleLoadMorePost={this.loadMorePost}
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
