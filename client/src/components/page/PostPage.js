import React from 'react';
import axios from 'axios';
import SinglePost from 'components/ui/Post/SinglePost';
import { RETRIEVE_POST } from 'constants/links.js';
import { addParamToUrl } from 'helpers/FetchServer.js';

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
    let url = RETRIEVE_POST;
    url = addParamToUrl(url, 'postId', this.state.postIdParam);
    url = addParamToUrl(url, 'withComment', true);
    await axios.post('/api/TestAPI', {})
      //await axios.post(url, {})
      .then((response) => {
        console.log(response.data);
        this.setState({ post: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ likePopup: oldPopup });
  }

  componentDidMount = async () => {
    let url = RETRIEVE_POST;
    url = addParamToUrl(url, 'postId', this.state.postIdParam);
    url = addParamToUrl(url, 'withComment', true);
    //await axios.post(url, {})
    await axios.post('/api/TestAPI', {})
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