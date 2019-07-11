import React, { Component } from 'react';
import { RETRIEVE_POSTS } from 'constants/links.js'
import axios from 'axios'
import NewsFeed from 'components/ui/NewsFeed.js'
/** Renders the /home page. */

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount = () => {
    var date = new Date();
    var timestamp = date.getTime(); //current time
    axios.post(RETRIEVE_POSTS, {
      maxCreationTime: {timestamp}, 
      limit: 10,
    })
    .then((response) => {
      this.setState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

render() {
  console.log(this.state.posts);
  return (
    <div className='container'>
      <h1 className='center'>News feed</h1>
      <NewsFeed posts={this.state.posts} />
    </div>
  );
}
}

export default Home;
