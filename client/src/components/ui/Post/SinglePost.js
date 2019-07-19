import React from 'react';
import { withRouter } from 'react-router-dom';
import SinglePicture from 'components/ui/Post/SinglePicture';
import PostAuthor from 'components/ui/Post/PostAuthor.js'
import LikeBar from 'components/ui/Post/LikeBar';
import parse from 'html-react-parser';
import InteractiveBar from 'components/ui/Post/InteractiveBar'
import CommentBar from 'components/ui/Post/CommentBar';
import DisplayTags from 'components/ui/tag/DisplayTags'

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLike: 0,
    }
    this.onChangeLikes = this.onChangeLikes.bind(this);
  }

  componentDidMount = () => {
    const { post } = this.props;
    if (Array.isArray(post.likedUserIds)) {
      this.setState({ numberOfLike: post.likedUserIds.length });
    }
  }

  onChangeLikes = (newLikes) => {
    this.setState({ numberOfLike: newLikes })
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
                <DisplayTags tags={post.tags} />
                <SinglePicture {...this.props} />
                <InteractiveBar
                  {...this.props}
                  numberOfLike={this.state.numberOfLike}
                  onChangeLikes={this.onChangeLikes}
                />
                <LikeBar
                  {...this.props}
                  numberOfLike={this.state.numberOfLike}
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