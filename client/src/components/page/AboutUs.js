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

import TeammateIntro from 'components/ui/TeammateIntro.js';

/**
 * @param teammate A teammate defined in reducers/teammates.js.
 * @param id A unique id for the teammate.
 * @return The html representation of a teammate's intro.
 */
const createTeammateUi = function(teammate, id) {
  return (
    <TeammateIntro
      key={id}
      name={teammate.name}
      description={teammate.description}
      hobby={teammate.hobby}
      askMeAbout={teammate.askMeAbout}
    />
  );
};

/** Renders the /about page. */
class AboutUs extends Component {
  render() {
    const { teammates } = this.props;
    const createTeammateListUi = teammates.keys.map(id =>
      createTeammateUi(teammates[id], id)
    );

    return (
      <div className='container pt-2'>
        <h1 className='center'>About Our Team</h1>
        {createTeammateListUi}
      </div>
    );
  }
}

AboutUs.propTypes = {
  /** A json representation of all members on our team. */
  teammates: PropTypes.object
};

/** Maps teammates data from redux to AboutUs. */
const mapStateToProps = function(state) {
  return { teammates: state.teammates };
};

export default connect(mapStateToProps)(AboutUs);
