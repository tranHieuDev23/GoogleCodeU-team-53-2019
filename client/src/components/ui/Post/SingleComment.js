import React from 'react';
import { withRouter } from 'react-router-dom';
import { differentFromNow } from 'helpers/Time';
import { Comment, Avatar, Tooltip } from 'antd';

class SingleComment extends React.Component {
  render() {
    const { comment } = this.props;
    const avatarUrl = comment.author.avatarUrl.value;
    return (
      <Comment
        author={comment.author.username}
        avatar={
          <Avatar
            src={avatarUrl}
            alt={comment.author.username}
          />
        }
        datetime={
          <Tooltip>
            <span>{differentFromNow(comment.creationTime)}</span>
          </Tooltip>
        }
        content={comment.text}
      />
    );
  }
}

export default withRouter(SingleComment);