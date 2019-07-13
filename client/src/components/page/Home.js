import React, { Component } from 'react';
import { RETRIEVE_POSTS } from 'constants/links.js'
import axios from 'axios'
import NewsFeed from 'components/ui/NewsFeed.js'

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
    const url = RETRIEVE_POSTS + "?maxCreationTime=" + timestamp + "&limit=10";
    axios.post(url, {})
      .then((response) => {
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
        <div className='container'>
          <h1 className='center'>News feed</h1>
          <NewsFeed posts={this.state.posts} />
        </div>
        );
      }
    }
    
    export default Home;
