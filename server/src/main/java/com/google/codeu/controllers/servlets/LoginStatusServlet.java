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

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.UserDao;
import com.google.codeu.models.User;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Returns user data as JSON, e.g. {"isLoggedIn": true, "userData": (JSON representation of an
 * <code>User</code> object)}
 */
@WebServlet(ServletLink.LOGIN_STATUS)
public class LoginStatusServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private UserDao userDao;
  private Gson gson;

  @Override
  public void init() throws ServletException {
    userDao = new UserDao();
    gson = new Gson();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    JsonObject jsonObject = new JsonObject();

    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      User user = userDao.getUser(userService.getCurrentUser().getUserId());
      if (user != null) {
        jsonObject.addProperty("isLoggedIn", true);
        jsonObject.addProperty("userData", gson.toJson(user));
      } else {
        jsonObject.addProperty("isLoggedIn", false);
      }
    } else {
      jsonObject.addProperty("isLoggedIn", false);
    }
    response.setContentType("application/json");
    response.getWriter().println(jsonObject.toString());
  }
}
