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
 * @fileoverview All links used by this app.
 * Client links do not need redirect to an external server.
 */

/** Prefix for all servlet fetch links. */
const servletPrefix = '/api';

/** Link to the login servlet. */
export const LOGIN = servletPrefix + '/login';
/** Link to the logout servlet. */
export const LOGOUT = servletPrefix + '/logout';
/**Link to the login status servlet. */
export const LOGIN_STATUS = servletPrefix + '/login-status';
/** Link to the message servlet.  */
export const MESSAGE = servletPrefix + '/messages';

/** Client link to the about page. */
export const ABOUT_US = servletPrefix + '/aboutus';
/** Client link to the home page. */
export const HOME = '/';
/** Client link to the user's page. */
export const USER_PAGE = '/userpage';

export const UPLOAD_PAGE = '/create-post';
