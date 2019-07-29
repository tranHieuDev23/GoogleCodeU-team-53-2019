package com.google.codeu.controllers.servlets;

import com.google.codeu.controllers.datastore.UserDao;
import com.google.codeu.models.User;
import com.google.codeu.utils.ServletLink;
import com.google.codeu.utils.UserJsonifier;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(ServletLink.API_RETRIEVE_USER)
public class RetrieveUserServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private UserDao userDao;

  @Override
  public void init() throws ServletException {
    userDao = new UserDao();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("application/json");
    String userId = req.getParameter("userId");
    User result = userDao.getUser(userId);
    res.getWriter().println(UserJsonifier.jsonify(result).toString());
  }
}
