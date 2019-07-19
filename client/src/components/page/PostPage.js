import React from 'react';
import SinglePost from 'components/ui/Post/SinglePost';
import { fetchPost } from 'helpers/LoadPost';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      postIdParam: this.props.match.params.postId,
      likePopup: false,
    };
  }

  onChangePost = async (index, oldPopup) => {
    const post = await fetchPost(this.state.postIdParam, true);
    if (post != null)
      this.setState({post: post});
    this.setState({ likePopup: oldPopup });
  }

  componentDidMount = async () => {
    const post = await fetchPost(this.state.postIdParam, true);
    if (post != null)
      this.setState({post: post});
  }

  render() {
    console.log(this.state);

    return (
      <div className='container pt-2'>
        {(this.state.post != null && this.state.post.id) ? (
          <React.Fragment>
            <h1 className='center'>{this.state.post.author.username} post</h1>
            <SinglePost
              userStatus={this.props.userStatus}
              post={this.state.post}
              order={1}
              onChangePost={this.onChangePost}
              withComment={true}
              popup={this.state.likePopup}
            />
          </React.Fragment>
        ) : (
            <div>{"This content is unavailable right now"}</div>
          )
        }
      </div>
    );
  }
}

export default PostPage;