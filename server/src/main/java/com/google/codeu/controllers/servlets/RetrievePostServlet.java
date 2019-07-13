package com.google.codeu.controllers.servlets;

import com.google.codeu.controllers.datastore.CommentDao;
import com.google.codeu.controllers.datastore.PostDao;
import com.google.codeu.models.Comment;
import com.google.codeu.models.Post;
import com.google.codeu.utils.ServletLink;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(ServletLink.API_RETRIEVE_POST)
public class RetrievePostServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private PostDao postDao;
  private CommentDao commentDao;

  @Override
  public void init() throws ServletException {
    postDao = new PostDao();
    commentDao = new CommentDao();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    if (!req.getParameterMap().containsKey("postId")) {
      res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    res.setContentType("application/json");

    UUID postId = UUID.fromString(req.getParameter("postId"));
    Post post = postDao.getPost(postId);
    JSONObject result = new JSONObject(post);
    if (Boolean.parseBoolean(req.getParameter("withComment"))) {
      List<Comment> comments = commentDao.getComments(postId);
      result.put("comments", new JSONArray(comments));
    }

    res.getWriter().println(result.toString());
  }
}
