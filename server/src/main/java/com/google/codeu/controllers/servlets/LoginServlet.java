/*
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

package com.google.codeu.controllers.servlets;

import com.google.appengine.api.datastore.Link;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.UserDao;
import com.google.codeu.models.User;
import com.google.codeu.utils.ServletLink;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Redirects the user to the Google login page or their page if they're already logged in. */
@WebServlet(ServletLink.LOGIN)
public class LoginServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;
  private static final Link DEFAULT_USER_AVATAR = new Link("/images/icons/user.png");

  private UserDao userDao;

  @Override
  public void init() throws ServletException {
    userDao = new UserDao();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();

    // If the user is already logged in, redirect to their page
    if (userService.isUserLoggedIn()) {
      String userId = userService.getCurrentUser().getUserId();
      User user = userDao.getUser(userId);
      // If this is the first time the user logs in, create a new User object and
      // store it
      if (user == null) {
        String username = userService.getCurrentUser().getEmail();
        user = new User(userId, username, DEFAULT_USER_AVATAR);
        userDao.storeUser(user);
      }
      response.sendRedirect(String.format(ServletLink.USER_PAGE, userId));
      return;
    }

    // Redirect to Google login page. That page will then redirect back to /login,
    // which will be handled by the above if statement.
    String googleLoginUrl = userService.createLoginURL(ServletLink.LOGIN_PAGE);
    response.sendRedirect(googleLoginUrl);
  }
}
