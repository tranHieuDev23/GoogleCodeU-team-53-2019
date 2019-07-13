import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'css/userPage.css';
import axios from 'axios';
import NewsFeed from 'components/ui/NewsFeed.js';
import { RETRIEVE_POSTS } from 'constants/links.js';

function getUrl(maxCreationTime, limit, userid) {
  return "?" + "maxCreationTime=" + maxCreationTime + "&limit=" + limit + "&userId=" + userid;
}

/** Renders the /user-page page. */
class UserPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      posts: [],
      userIdParam: this.props.match.params.userId
    };
    console.log(this.state);
  }
  componentDidMount = () => {
    let date = new Date();
    let timestamp = date.getTime(); //current time
    let url = RETRIEVE_POSTS + getUrl(timestamp, 10, this.state.userIdParam);
    axios
      .post(url, {})
      .then(response => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className='container pt-2'>
        <h1 className='center'>User Page</h1>
        {this.state.posts.length > 0 &&
          <NewsFeed posts={this.state.posts} />
        }
      </div>
    );
  }
}

UserPage.propTypes = {
  /** A json of the user data. */
  userData: PropTypes.object
};

/** Maps user data from redux to UserPage. */
const mapStateToProps = function (state) {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(UserPage);
