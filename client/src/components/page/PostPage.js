import React from 'react';
import axios from 'axios';
import SinglePost from 'components/ui/Post/SinglePost';
import { RETRIEVE_POST } from 'constants/links.js';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postIdParam: this.props.match.params.postId,
    };
  }

  onChangePost = () => {
    
  }

  componentDidMount = async () => {
    const url = RETRIEVE_POST + "?postId=" + this.state.postIdParam;
    axios.post(url, {})
      .then((response) => {
        console.log(response.data);
        this.setState({ post: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
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