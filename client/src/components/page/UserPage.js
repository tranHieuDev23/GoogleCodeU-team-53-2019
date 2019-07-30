import React, { Component } from 'react';
import NewFeedWrapper from 'components/NewFeedWrapper';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from 'helpers/LoadPost';
import { fetchUser } from 'helpers/LoadUser';
import Page404 from 'components/Result/Page404';
import Loading from './Loading';
import UserProfile from 'components/ui/UserProfile';

class UserPage extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const timestamp = date.getTime(); //current time
    this.state = {
      posts: [],
      userIdParam: this.props.match.params.userId,
      minTimestamp: timestamp,
      profile: null,
      didMount: false
    };
    this.loadMorePost = this.loadMorePost.bind(this);
  }

  componentDidMount = async () => {
    // get user email
    const user = await fetchUser(this.state.userIdParam);
    if (user === null) {
      this.setState({ didMount: true });
      return;
    }
    this.setState({ profile: user });
    // get Posts
    const date = new Date();
    const timestamp = date.getTime(); //current time
    const newPosts = await fetchPosts(
      timestamp,
      5,
      '',
      this.state.userIdParam,
      ''
    );
    if (newPosts != null) {
      let newMinTimestamp = this.state.minTimestamp;
      this.setState({ posts: newPosts });
      newPosts.forEach(post => {
        newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
      });
      this.setState({ minTimestamp: newMinTimestamp - 1 });
    }
    this.setState({ didMount: true });
  };

  componentDidUpdate = async () => {
    if (this.state.userIdParam !== this.props.match.params.userId) {
      this.setState({ userIdParam: this.props.match.params.userId });
      const date = new Date();
      const timestamp = date.getTime(); //current time
      const newPosts = await fetchPosts(
        timestamp,
        5,
        '',
        this.props.match.params.userId,
        ''
      );
      if (newPosts != null) {
        let newMinTimestamp = timestamp;
        this.setState({ posts: newPosts });
        newPosts.forEach(post => {
          newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
        });
        this.setState({ minTimestamp: newMinTimestamp - 1 });
      }
    }
  };

  loadMorePost = async () => {
    const morePosts = await fetchPosts(
      this.state.minTimestamp,
      5,
      '',
      this.state.userIdParam,
      ''
    );
    if (morePosts != null) {
      if (morePosts.length > 0) {
        let newMinTimestamp = this.state.minTimestamp;
        morePosts.forEach(post => {
          newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
        });
        this.setState({ minTimestamp: newMinTimestamp - 1 });
        let newPosts = [...this.state.posts];
        newPosts.push(...morePosts);
        this.setState({ posts: newPosts });
        return true;
      }
    }
    return false;
  };

  render() {
    const { didMount, profile, posts } = this.state;
    const { userStatus } = this.props;
    let owner = false;
    if (profile !== null)
      owner = (profile.id === userStatus.userId);

    return (
      <div className='container pt-2'>
        {(profile !== null) ? (
          <div>
            <h1 className='center'>{profile.username} Page</h1>
            <UserProfile profile={profile} owner={owner} />
            <NewFeedWrapper
              userStatus={userStatus}
              posts={posts}
              handleLoadMorePost={this.loadMorePost}
            />
          </div>
        ) : (
            <React.Fragment>
              {didMount ? <Page404 /> : <Loading />}
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default withRouter(UserPage);
