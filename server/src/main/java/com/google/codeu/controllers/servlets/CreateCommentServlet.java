package com.google.codeu.controllers.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.CommentDao;
import com.google.codeu.models.Comment;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.text.StringEscapeUtils;

@WebServlet(ServletLink.API_CREATE_COMMENT)
public class CreateCommentServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private CommentDao commentDao;
  private Gson gson;

  @Override
  public void init() throws ServletException {
    commentDao = new CommentDao();
    gson = new Gson();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("application/json");
    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }
    String userId = userService.getCurrentUser().getUserId();

    if (!req.getParameterMap().containsKey("postId")
        || !req.getParameterMap().containsKey("commentText")) {
      res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }
    UUID postId = UUID.fromString(req.getParameter("postId"));
    String commentText = req.getParameter("commentText");
    commentText = StringEscapeUtils.escapeHtml4(commentText);
    Comment comment = new Comment(userId, postId, commentText);
    commentDao.storeComment(comment);

    res.getWriter().println(gson.toJson(comment));
  }
}
