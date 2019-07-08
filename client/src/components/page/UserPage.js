/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'css/userPage.css';
import { HIDDEN } from 'constants/css.js';
import { MESSAGE } from 'constants/links.js';
import Message from 'components/ui/Message.js';
import RichTextEditor from 'components/ui/RichTextEditor.js';

/** Gets the parameters from the url. Parameters are after the ? in the url. */
const urlParams = new URLSearchParams(window.location.search);
/** The email of the currently displayed user. */
const userEmailParam = urlParams.get('user');

/**
 * @param message A message sent from a user with a timestamp.
 * @return The html representation of a contributor's intro.
 */
const createMessageUi = function(message) {
  return (
    <Message
      key={message.id}
      sender={message.user}
      timestamp={message.timestamp}
      content={message.text}
    />
  );
};

/** Renders the /user-page page. */
class UserPage extends Component {
  state = {
    messages: null
  };

  componentDidMount() {
    this.fetchMessages();
  }

  /** Fetches messages and add them to the page. */
  fetchMessages() {
    const url = MESSAGE + '?user=' + userEmailParam;
    fetch(url, {method: 'POST'})
      .then(response => {
        return response.json();
      })
      .then(messages => {
        this.setState({ messages });
      });
  }

  render() {
    const { messages } = this.state;
    const { userEmail } = this.props.userData;

    // A boolean that checks whether the current logged in user is viewing
    // another user's page. Some controls such as the message form will hide if
    // the user is not viewing their own page.
    const hiddenIfViewingOther = userEmail !== userEmailParam ? HIDDEN : null;
    const hiddenIfHasMessages = messages && messages.length > 0 ? HIDDEN : null;

    const messagesUi = messages
      ? messages.map(message => createMessageUi(message))
      : null;

    return (
      <div className='container'>
        <h1 className='center'>{userEmailParam}</h1>
        <form action={MESSAGE} method='POST' className={hiddenIfViewingOther}>
          Enter a new message:
          
          <br />
          <RichTextEditor id='text' className='message-input'/>
          <br />
          <input type='file' />
          <input type='submit' value='Submit' />
        </form>
        <br className={hiddenIfViewingOther} />
        <hr />

        <p className={hiddenIfHasMessages}>This user has no posts yet.</p>
        {messagesUi}
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
