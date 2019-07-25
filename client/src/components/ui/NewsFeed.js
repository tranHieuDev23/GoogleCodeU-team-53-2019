import React from 'react';
import SinglePost from './Post/SinglePost';
import { fetchPost } from 'helpers/LoadPost.js';

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      curIndex: 0
    };
  }

  onChangePost = async (index, oldPopup) => {
    let newItems = [...this.state.items];
    const { posts } = this.props;
    let newPost = await fetchPost(posts[index].id);
    if (newPost == null) {
      console.log("Can't re fetch single post");
      return;
    }
    const date = new Date();
    const timestamp = date.getTime();
    newItems[index] = (
      <SinglePost
        userStatus={this.props.userStatus}
        post={newPost}
        order={index}
        key={newPost.id + '-' + timestamp}
        onChangePost={this.onChangePost}
        withComment={false}
        popup={oldPopup}
      />
    );
    this.setState({ items: newItems });
  };

  componentDidMount = () => {
    this.addMorePost();
  };

  componentDidUpdate = async () => {
    this.addMorePost();
  };

  addMorePost = (curIndex = this.state.curIndex, items = this.state.items) => {
    const { posts } = this.props;
    let newItems = [...items];
    if (isArray(posts)) {
      for (let index = curIndex; index < posts.length; index++) {
        let post = posts[index];
        newItems.push(
          <SinglePost
            userStatus={this.props.userStatus}
            post={post}
            order={index}
            key={post.id}
            onChangePost={this.onChangePost}
            withComment={false}
            popup={false}
          />
        );
      }
      if (curIndex !== posts.length) {
        this.setState({ curIndex: posts.length });
        this.setState({ items: newItems });
      }
    }
  };

  render() {
    return <div>{this.state.items}</div>;
  }
}

export default NewsFeed;
