import React, { Component } from 'react';
import NewFeedWrapper from 'components/NewFeedWrapper';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from 'helpers/LoadPost';

class TagPage extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const timestamp = date.getTime(); //current time
    this.state = {
      posts: [],
      tagName: this.props.match.params.tagName,
      minTimestamp: timestamp,
    }
    this.loadMorePost = this.loadMorePost.bind(this);
  }

  componentDidMount = async () => {
    // get Posts
    const date = new Date();
    const timestamp = date.getTime(); //current time
    const newPosts = await fetchPosts(timestamp, 10, '', '', this.state.tagName);
    if (newPosts != null) {
      let newMinTimestamp = this.state.minTimestamp;
      this.setState({ posts: newPosts });
      newPosts.forEach(function (post) {
        newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
      });
      this.setState({ minTimestamp: newMinTimestamp - 1 });
    }
  }

  componentDidUpdate = async () => {
    if (this.state.tagName !== this.props.match.params.tagName) {
      this.setState({ tagName: this.props.match.params.tagName });
      const date = new Date();
      const timestamp = date.getTime(); //current time
      const newPosts = await fetchPosts(timestamp, 10, '', '', this.props.match.params.tagName);
      if (newPosts != null) {
        let newMinTimestamp = timestamp;
        this.setState({ posts: newPosts });
        newPosts.forEach(post => {
          newMinTimestamp = Math.min(newMinTimestamp, post.creationTime);
        });
        this.setState({ minTimestamp: newMinTimestamp - 1 });
      }
    }
  }

  loadMorePost = async () => {
    const morePosts = await fetchPosts(this.state.minTimestamp, 10, '', '', this.state.tagName);
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
  }

  render() {
    return (
      <div className='container pt-2'>
        <div>
          <h1 className='center'>#{this.state.tagName} Page</h1>
          <NewFeedWrapper
            userStatus={this.props.userStatus}
            posts={this.state.posts}
            handleLoadMorePost={this.loadMorePost}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(TagPage);
