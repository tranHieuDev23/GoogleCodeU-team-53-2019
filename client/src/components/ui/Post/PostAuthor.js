import React from 'react';

class PostAuthor extends React.Component {
  render() {
    const { author, creationTime } = this.props.post;

    return (
      <div className="Post__Author">
        <img src={author.avatarUrl.value} className="Post__Author__Avatar" alt="avatar" />
        <div className="Post__Author__Wrapper">
          <div className="Post__Author__Username">{author.username}</div>
          <div className="Post__Author__Time">{creationTime}</div>
        </div>
      </div>
    );
  }
}

export default PostAuthor;