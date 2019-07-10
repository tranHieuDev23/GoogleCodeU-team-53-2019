import React from 'react';
import axios from 'axios';
import SinglePost from 'components/ui/Post/SinglePost';

const urlParams = new URLSearchParams(window.location.search);
const postIdParam = urlParams.get('postid');

class PostPage extends React.Component {
  componentDidMount = () => {
    axios.post("/testAPI", {
      postId: { postIdParam },
    })
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
      <div className='container'>
        <h1 className='center'>Post page</h1>
          <SinglePost post={this.state} />
      </div>
    );
  }
}

export default PostPage;