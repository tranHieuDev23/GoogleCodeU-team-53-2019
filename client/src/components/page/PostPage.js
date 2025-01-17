import React from 'react';
import { withRouter } from 'react-router-dom';
import SinglePost from 'components/ui/Post/SinglePost';
import { fetchPost } from 'helpers/LoadPost';
import Page404 from 'components/Result/Page404';
import Loading from './Loading';
import { HOME } from 'constants/links';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      postIdParam: this.props.match.params.postId,
      likePopup: false,
      didMount: false
    };
  }

  onChangePost = async (index, oldPopup) => {
    if (oldPopup === 'delete') {
      this.props.history.push(HOME);
    }
    else {
      const post = await fetchPost(this.state.postIdParam, true);
      if (post != null) this.setState({ post: post });
      this.setState({ likePopup: oldPopup });
    }
  };

  componentDidMount = async () => {
    const post = await fetchPost(this.state.postIdParam, true);
    if (post != null) this.setState({ post: post });
    this.setState({ didMount: true });
  };

  render() {
    const { didMount } = this.state;
    return (
      <div className='container pt-2'>
        {this.state.post != null && this.state.post.id ? (
          <React.Fragment>
            <h1 className='center'>{this.state.post.author.username} post</h1>
            <SinglePost
              isNewfeed={false}
              userStatus={this.props.userStatus}
              post={this.state.post}
              order={1}
              onChangePost={this.onChangePost}
              withComment={true}
              popup={this.state.likePopup}
            />
          </React.Fragment>
        ) : (
            <React.Fragment>
              {didMount ? <Page404 /> : <Loading />}
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default withRouter(PostPage);
