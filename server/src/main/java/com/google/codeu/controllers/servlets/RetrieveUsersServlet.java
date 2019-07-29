package com.google.codeu.controllers.servlets;

import com.google.codeu.controllers.datastore.UserDao;
import com.google.codeu.models.User;
import com.google.codeu.utils.ServletLink;
import com.google.codeu.utils.UserJsonifier;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(ServletLink.API_RETRIEVE_USERS)
public class RetrieveUsersServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private UserDao userDao;

  @Override
  public void init() throws ServletException {
    userDao = new UserDao();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("application/json");
    try {
      String userIdsString = req.getParameter("userIds");
      JSONArray userIds = new JSONArray(userIdsString);
      JSONArray result = new JSONArray();
      for (int i = 0; i < userIds.length(); i++) {
        String id = userIds.getString(i);
        User user = userDao.getUser(id);
        if (user == null)
          throw new Exception("One of the userIds cannot be found in the database: " + id);
        result.put(UserJsonifier.jsonify(user));
      }

      JSONObject response = new JSONObject();
      response.put("users", result);
      res.getWriter().write(response.toString());
    } catch (Exception e) {
      e.printStackTrace();
      res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    }
  }
}
