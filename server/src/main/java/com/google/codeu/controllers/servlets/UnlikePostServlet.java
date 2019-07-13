package com.google.codeu.controllers.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.PostDao;
import com.google.codeu.utils.ServletLink;
import java.io.IOException;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(ServletLink.API_UNLIKE_POST)
public class UnlikePostServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private PostDao postDao;

  @Override
  public void init() throws ServletException {
    postDao = new PostDao();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    String userId = userService.getCurrentUser().getUserId();
    UUID postId = UUID.fromString(req.getParameter("postId"));
    postDao.unlikePost(postId, userId);
  }
}
