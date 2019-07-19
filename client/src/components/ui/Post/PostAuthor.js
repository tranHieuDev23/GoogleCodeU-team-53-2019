import React from 'react';
import { differentFromNow } from 'helpers/Time';
import { USER_PAGE } from 'constants/links.js';
import { withRouter } from 'react-router-dom';

class PostAuthor extends React.Component {
  render() {
    const { author, creationTime } = this.props.post;

    return (
      <div className="Post__Author">
        <img src={author.avatarUrl.value} className="Post__Author__Avatar" alt="avatar" />
        <div className="Post__Author__Wrapper">
          <div
            className="Post__Author__Username"
            onClick={() => {
              this.props.history.push(USER_PAGE + '/' + author.id.toString());
            }}>
            {author.username}
          </div>
          <div className="Post__Author__Time">{differentFromNow(creationTime)}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(PostAuthor);