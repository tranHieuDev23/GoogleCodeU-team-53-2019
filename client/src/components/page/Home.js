import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NewFeedWrapper from 'components/NewFeedWrapper';
import { fetchPosts } from 'helpers/LoadPost';
import Loading from 'components/page/Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const timestamp = date.getTime(); //current time
    this.state = {
      posts: [],
      minTimestamp: timestamp,
      didMount: false
    };
    this.loadMorePost = this.loadMorePost.bind(this);
  }

  componentDidMount = async () => {
    const date = new Date();
    const timestamp = date.getTime(); //current time
    const newPosts = await fetchPosts(timestamp, 10, '', '', '');
    if (newPosts != null) {
      let newMinTimestamp = this.state.minTimestamp;
      this.setState({ posts: newPosts });
      newPosts.forEach(function(post) {
        newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
      });
      this.setState({ minTimestamp: newMinTimestamp - 1 });
    }
    this.setState({ didMount: true });
  };

  loadMorePost = async () => {
    const morePosts = await fetchPosts(this.state.minTimestamp, 10, '', '', '');
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
    const { didMount } = this.state;
    return (
      <div className='container pt-2'>
        <div>
          <h1 className='center'>News Feed</h1>
          {this.state.posts.length > 0 ? (
            <NewFeedWrapper
              userStatus={this.props.userStatus}
              posts={this.state.posts}
              handleLoadMorePost={this.loadMorePost}
            />
          ) : (
            <React.Fragment>
              {didMount ? <React.Fragment /> : <Loading />}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
