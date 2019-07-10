import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'css/userPage.css';
import { HIDDEN } from 'constants/css.js';
import axios from 'axios'
import NewsFeed from 'components/ui/NewsFeed.js'

/** Renders the /user-page page. */
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userEmailParam: this.props.match.params.email,
    }

    /** The email of the currently displayed user. */
    console.log("MAIL:");
    console.log(this.state.userEmailParam);
  }
  componentDidMount = () => {
    var date = new Date();
    var timestamp = date.getTime(); //current time
    //axios.post(RETRIEVE_POSTS, {
    axios.post("/testAPI", {
      maxCreationTime: { timestamp },
      limit: 10,
      postions: null,
      userId: null,
      tagId: null,
    })
      .then((response) => {
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { userEmail } = this.props.userData;
    console.log("Test--");
    console.log(userEmail);
    console.log(this.state.userEmailParam);
    const hiddenIfViewingOther = userEmail !== this.state.userEmailParam ? HIDDEN : null;
    return (
      <div className={hiddenIfViewingOther}>
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
const mapStateToProps = function (state) {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(UserPage);
