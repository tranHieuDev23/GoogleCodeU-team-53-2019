import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'css/userPage.css';
import axios from 'axios';
import NewsFeed from 'components/ui/NewsFeed.js';
import { RETRIEVE_POSTS } from 'constants/links.js';
import data from 'json/posts.json';

/** Renders the /user-page page. */
class UserPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      posts: [],
      userIdParam: this.props.match.params.userId
    };
    console.log('User ID');
    console.log(this.props.match.params.userId);

    /** The email of the currently displayed user. */
  }
  componentDidMount = () => {
    var date = new Date();
    var timestamp = date.getTime(); //current time
    axios
      .post(RETRIEVE_POSTS, {
        maxCreationTime: timestamp,
        limit: 10,
        userId: parseInt(this.state.userIdParam)
      })
      .then(response => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1 className='center'>News feed</h1>
        <NewsFeed posts={this.state.posts} />
      </div>
    );
  }
}

UserPage.propTypes = {
  /** A json of the user data. */
  userData: PropTypes.object
};

/** Maps user data from redux to UserPage. */
const mapStateToProps = function(state) {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(UserPage);
