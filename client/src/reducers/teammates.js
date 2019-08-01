import user from '../assets/icons/user.svg';
import hieu from '../assets/hieu.jpg';
import suyeon from '../assets/suyeon.jpg';
import hyeln from '../assets/hyeln.jpg';
import long from '../assets/long.jpg';
import johnny from '../assets/johny.jpg';
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

/** @return A json representation of our teammate. */
const createTeammate = function(name, description, hobby, askMeAbout, displayImage) {
  return { name, description, hobby, askMeAbout, displayImage };
};

/** Json of all teammates.. */
const teammates = {
  1: createTeammate(
    'Suyeon Lee',
    'I need more coffee',
    'Making certain routine during a day',
    'Coffee, Music, Books, Exchange student, Kakao, Travel',
    suyeon
  ),
  2: createTeammate(
    'Hye In Kim',
    'Optimistic, Excited and Hopeful! I am going to ICML 2019!',
    'I want to learn Neuroscience',
    'Art (I was an art student), Anime, Electronic Music, Nerd stuff',
    hyeln
  ),
  3: createTeammate(
    'Trần Minh Hiếu',
    'A little bit melted under Hanoi\'s summer heat. I want to go to the sea~',
    'Doing cool stuffs with Genetics Algorithm and Neural Network.',
    'Programming, Comics, Anime, Haruki Murakami and general nerd stuffs.',
    hieu
  ),
  4: createTeammate(
    'Hoàng Bảo Long',
    'I just wanna go out to sea. It\'s too hot now in Vietnam!',
    'Learning about Deep learning and optimization',
    'Football, anime and fantasy novels.',
    long
  ),
  5: createTeammate(
    'Johnny Benitez',
    'I want to go backpacking in Vietnam',
    'To complete my Sport Pilot Flying License',
    'Star Wars, GSuite/Google Apps, Google Cloud, Microsoft, SCUBA Diving, Food and Travel',
    johnny
  ),
  keys: [1, 2, 3, 4, 5]
};

/**
 * A reducer that manipulates the state of team member info.
 * @param state The state of team members.
 */
const teammatesReducer = function(state = teammates) {
  return state;
};

export default teammatesReducer;
