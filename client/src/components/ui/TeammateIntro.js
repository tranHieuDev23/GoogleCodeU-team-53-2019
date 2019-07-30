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
import { Card, Avatar } from 'antd';

const { Meta } = Card;

/**
 * An introduction card for each teammate.
 * @return The html representation of the card.
 */
const TeammateIntro = function (props) {
  return (
    <Card
      style={{ 
        width: '100%',
        height: '100%'
      }}>
      <Meta
        avatar={
          <Avatar
            size={120}
            src={props.displayImage} />
        }
        title={props.name}
        description={
          <ul>
            <li>{props.description}</li>
            <li>{props.hobby}</li>
            <li>{props.askMeAbout}</li>
          </ul>
        } />
    </Card>
  );
};

TeammateIntro.propTypes = {
  /** Name of teammate. */
  name: PropTypes.string,
  /** Description of teammate. */
  description: PropTypes.string,
  /** Teammate's hobby. */
  hobby: PropTypes.string,
  /** Topics to talk about with teammate. */
  askMeAbout: PropTypes.string
};

export default TeammateIntro;
