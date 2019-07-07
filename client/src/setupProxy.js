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
 * @fileoverview React system configuration that allows proxying all requests
 * to the development server. This file does not need to be included anywhere
 * since it is used when `npm start` is invoked.
 *
 * See: https://bit.ly/2JfbgHX
 */

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  /** Proxies calls to our Google App Engine. */
  app.use(proxy('/api/*', { target: 'http://localhost:8080/' }));
  /** Proxies calls to the Google Login Server. */
  app.use(proxy('/_ah/*', { target: 'http://localhost:8080/' }));
};
