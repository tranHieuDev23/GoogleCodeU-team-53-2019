import React from 'react';
import { withRouter } from 'react-router-dom';
import SinglePicture from 'components/ui/Post/SinglePicture';
import PostAuthor from 'components/ui/Post/PostAuthor.js';
import LikeBar from 'components/ui/Post/LikeBar';
import parse from 'html-react-parser';
import InteractiveBar from 'components/ui/Post/InteractiveBar';
import CommentBar from 'components/ui/Post/CommentBar';
import DisplayTags from 'components/ui/tag/DisplayTags';

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      numberOfLike: (this.props.post != null? this.props.post.likedUserIds.length : 0),
    }
    this.onChangeLikes = this.onChangeLikes.bind(this);
  }

  componentDidUpdate = () => {
    const {post} = this.props;
    if (!postChanged(this.state.post, post))
      return;
    this.setState({
      post: post,
      numberOfLike: (post != null? post.likedUserIds.length : 0)
    });
  }

  onChangeLikes = newLikes => {
    this.setState({ numberOfLike: newLikes });
  };

  render() {
    const { post, numberOfLike } = this.state;
    return (
      <React.Fragment>
        {
          (post == null) ? (
            <div />
          ) : (
              <div className="Post">
                <PostAuthor {...this.props} />
                <div className="Post__Description">{parse(post.descriptionText)}</div>
                <DisplayTags tags={post.tags} />
                <SinglePicture {...this.props} />
                <InteractiveBar
                  {...this.props}
                  numberOfLike={numberOfLike}
                  onChangeLikes={this.onChangeLikes}
                />
                <LikeBar
                  {...this.props}
                  numberOfLike={numberOfLike}
                  onChangeLikes={this.onChangeLikes}
                />
                {this.props.withComment &&
                  <CommentBar
                    {...this.props}
                  />
                }
              </div>
            )
        }
      </React.Fragment >
    );
  }
}

export default withRouter(SinglePost);

function postChanged(oldPost, newPost) {
  if (oldPost == null)
    return newPost != null;
  if (newPost == null)
    return true;
  if (oldPost.id !== newPost.id)
    return true;
  if (oldPost.likedUserIds.length !== newPost.likedUserIds.length)
    return true;
  for (let i = 0; i < oldPost.likedUserIds.length; i ++)
    if (oldPost.likedUserIds[i] !== newPost.likedUserIds[i])
      return true;
  return false;
}
