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

/**
 * Unique action keys that can manipulate user data.
 * Next id: 4
 */
const UserDataAction = {
  SET_USER_EMAIL: 1
};

/** The initial user data state when the app first loads. */
const intialUserDataState = {
  userEmail: null
};

/**
 *  @param state The previous user data state.
 *  @param userEmail The user's email.
 *  @return The new user data state.
 */
const handleUserEmail = function(state, userEmail) {
  return { ...state, userEmail: userEmail };
};

/**
 * A reducer that manipulates the state of the user.
 * @param state The current state of the user data.
 * @param action Some action to perform on the user data.
 */
const userDataReducer = function(state = intialUserDataState, action) {
  switch (action.type) {
    case UserDataAction.SET_USER_EMAIL:
      return handleUserEmail(state, action.param);
    default:
      return state;
  }
};

/**
 * @param {!UserAction} action An action to modify the user data.
 * @param param A parameter of any time that accompanies the action.
 * @return An action to store the user's email.
 */
const storeUserData = function(action, param) {
  return {
    type: action,
    param
  };
};

export { UserDataAction, storeUserData };
export default userDataReducer;
