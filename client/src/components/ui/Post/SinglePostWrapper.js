import React from 'react';
import SinglePost from './SinglePost';

class SinglePostWrapper extends React.Component {
  render() {
    return (
      <SinglePost
        userStatus={this.props.userStatus}
        post={this.props.post}
        order={1}
        onChangePost={this.onChangePost}
        withComment={false}
      />
    );
  }
}

export default SinglePostWrapper;