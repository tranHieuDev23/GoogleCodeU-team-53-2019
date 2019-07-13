import React from 'react';
import axios from 'axios';
import SinglePost from 'components/ui/Post/SinglePost';
import { RETRIEVE_POST } from 'constants/links.js';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postImages: [],
      postIdParam: this.props.match.params.postId,
    };
  }

  componentDidMount = () => {
    const url = RETRIEVE_POST + "?postId=" + this.state.postIdParam;
    axios.post(url, {})
      .then((response) => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className='container pt-2'>
        <h1 className='center'>Post page</h1>
        {this.state.postImages.length > 0 &&
          <SinglePost post={this.state} />
        }
        {this.state.postImages.length === 0 &&
          <div>{"This content is unavailable right now"}</div>
        }
      </div>
    );
  }
}

export default PostPage;