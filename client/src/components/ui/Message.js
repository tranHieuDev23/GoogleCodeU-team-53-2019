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

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A message card contaning a sender, timestamp, and content body.
 * @return The html representation of the card.
 */



const Message = function(props) {

  function createMarkup() {
    return {__html: props.content};
  }

  return (
    <div className='Message message-div'>
      <div className='message-header'>
        {props.sender + ' - ' + new Date(props.timestamp)}
      </div>
      <div className='message-body'dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
};

Message.propTypes = {
  /** Name of the user posting the message. */
  sender: PropTypes.string,
  /** The timestamp of the message. */
  timestamp: PropTypes.number,
  /** The content of the message.. */
  content: PropTypes.string
};

export default Message;
