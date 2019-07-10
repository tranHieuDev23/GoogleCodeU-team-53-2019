import React from 'react'
import SinglePost from './Post/SinglePost';

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

class NewsFeed extends React.Component {

  render() {
    const items = [];
    const { posts } = this.props;

    if (isArray(posts))  {

      for (const [index, post] of posts.entries()) {
        items.push(
          <SinglePost post={post} key={index} />
        );
      }
    }

    return (
      <div>
        {items}
      </div>
    );
  }
}

export default NewsFeed;