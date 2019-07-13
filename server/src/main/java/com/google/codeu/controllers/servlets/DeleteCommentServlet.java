package com.google.codeu.controllers.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.CommentDao;
import com.google.codeu.models.Comment;
import com.google.codeu.utils.ServletLink;
import java.io.IOException;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(ServletLink.API_DELETE_COMMENT)
public class DeleteCommentServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private CommentDao commentDao;

  @Override
  public void init() throws ServletException {
    commentDao = new CommentDao();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("application/json");

    UUID commentId = UUID.fromString(req.getParameter("commentId"));
    Comment comment = commentDao.getComment(commentId);
    if (comment == null) {
      res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    String userId = userService.getCurrentUser().getUserId();
    if (!comment.getAuthorId().equals(userId)) {
      res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    commentDao.deleteComment(commentId);
  }
}
