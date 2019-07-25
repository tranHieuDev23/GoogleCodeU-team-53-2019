import React from 'react';
import SinglePost from 'components/ui/Post/SinglePost';
import { fetchPost } from 'helpers/LoadPost';
import Page404 from 'components/Result/Page404';
import Loading from 'components/page/Loading';

class SinglePostWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likePopup: false,
      didMount: false
    };
  }

  onChangePost = async (index, oldPopup) => {
    const { postId } = this.props;
    const post = await fetchPost(postId, false);
    if (post != null) this.setState({ post: post });
    this.setState({ likePopup: oldPopup });
  };

  componentDidMount = async () => {
    const { postId } = this.props;
    const post = await fetchPost(postId, false);
    if (post != null) this.setState({ post: post });
    this.setState({ didMount: true });
  };

  render() {
    const { didMount, post, likePopup } = this.state;
    const { userStatus } = this.props;

    return (
      <div className='container pt-2'>
        {this.state.post != null && this.state.post.id ? (
          <SinglePost
            userStatus={userStatus}
            post={post}
            order={1}
            onChangePost={this.onChangePost}
            withComment={false}
            popup={likePopup}
          />
        ) : (
          <React.Fragment>
            {didMount ? <Page404 /> : <Loading />}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default SinglePostWrapper;
