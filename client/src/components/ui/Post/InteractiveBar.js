import React from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as RedLikeIcon } from 'assets/icons/red_like.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { POST_PAGE, PLEASE_LOGIN } from 'constants/links.js';
import { LIKE, UNLIKE } from 'constants/links.js';
import axios from 'axios'

class InteractiveBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleComment = this.handleComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.state = {
      liked: false,
    }
  }

  componentDidMount = () => {
    const { post, userStatus } = this.props;
    if (Array.isArray(post.likedUserIds)) {
      if (post.likedUserIds.includes(userStatus.userId))
        this.setState({ liked: true });
    }
  }

  handleComment = () => {
    if (!this.props.withComment) {
      this.props.history.push(POST_PAGE + '/' + this.props.post.id);
    }
  }

  handleLike = () => {
    console.log(this.props);
    console.log(this.props.userStatus);
    const { isLogin } = this.props.userStatus;
    if (!isLogin) {
      this.props.history.push(PLEASE_LOGIN);
    }
    const { post } = this.props;
    let url = LIKE + '?postId=' + post.id;
    if (this.state.liked) {
      url = UNLIKE + '?postId=' + post.id;
      this.props.onChangeLikes(this.props.numberOfLike - 1);
    }
    else {
      this.props.onChangeLikes(this.props.numberOfLike + 1);
    }
    axios
      .post(url, {})
      .then(response => {
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ liked: !this.state.liked });
  }

  render() {
    return (
      <div className="Post__Icons">
        {(this.state.liked) ?
          (
            <RedLikeIcon className="Post__Icons__Icon" onClick={this.handleLike} />
          ) : (
            <LikeIcon className="Post__Icons__Icon" onClick={this.handleLike} />
          )
        }
        <CommentIcon className="Post__Icons__Icon" onClick={this.handleComment} />
      </div>
    );
  }
}

export default withRouter(InteractiveBar);