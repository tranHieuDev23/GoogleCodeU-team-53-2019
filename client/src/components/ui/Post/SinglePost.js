import React from 'react';
import SinglePicture from 'components/ui/Post/SinglePicture';
import PostAuthor from 'components/ui/Post/PostAuthor.js'
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as RedLikeIcon } from 'assets/icons/red_like.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import parse from 'html-react-parser';
class SinglePost extends React.Component {
  constructor(props)  {
    super(props);
    this.handleComment = this.handleComment.bind(this);
  }

  handleComment = () => {

  }

  render() {
    const { post } = this.props;
    return (
      <React.Fragment>
        {
          (post == null) ? (
            <div />
          ) : (
              <div className="Post">
                <PostAuthor {...this.props} />
                <div className="Post__Description">{parse(post.descriptionText)}</div>
                <SinglePicture {...this.props} />
                <div className="Post__Icons">
                  <LikeIcon className="Post__Icons__Icon" />
                  <CommentIcon className="Post__Icons__Icon" onClick={this.handleComment}/>
                </div>
              </div>
            )
        }
      </React.Fragment >
    );
  }
}

export default SinglePost;
/*
<div className="Post__Comments">
  <div className="Post__Comments__Comment">
    ABC
  </div>
  <div className="Post__Comments__Comment">
    ABC
  </div>
  <div className="Post__Comments__Comment">
    ABC
  </div>
</div>
*/