package com.google.codeu.controllers.servlets;

import com.google.codeu.controllers.datastore.CommentDao;
import com.google.codeu.controllers.datastore.PostDao;
import com.google.codeu.controllers.datastore.TagDao;
import com.google.codeu.models.Comment;
import com.google.codeu.models.Location;
import com.google.codeu.models.Post;
import com.google.codeu.models.Tag;
import com.google.codeu.utils.ServletLink;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(ServletLink.API_RETRIEVE_POSTS)
public class RetrievePostsServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private PostDao postDao;
  private TagDao tagDao;
  private CommentDao commentDao;

  @Override
  public void init() throws ServletException {
    postDao = new PostDao();
    tagDao = new TagDao();
    commentDao = new CommentDao();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    if (!req.getParameterMap().containsKey("maxCreationTime")
        || !req.getParameterMap().containsKey("limit")) {
      res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    res.setContentType("application/json");

    boolean baseOnLocation = req.getParameterMap().containsKey("swLat")
      && req.getParameterMap().containsKey("swLng")
      && req.getParameterMap().containsKey("neLat")
      && req.getParameterMap().containsKey("neLng");
    boolean baseOnUser = req.getParameterMap().containsKey("userId");
    boolean baseOnTag = req.getParameterMap().containsKey("tagName");
    boolean baseOnTime = (!baseOnLocation) && (!baseOnUser) && (!baseOnTag);

    List<Post> posts = null;
    if (baseOnTime) posts = getPostsBasedOnTime(req);
    if (baseOnLocation) posts = getPostsBasedOnLocation(req);
    if (baseOnUser) posts = getPostsBasedOnUser(req);
    if (baseOnTag) posts = getPostsBasedOnTag(req);

    JSONObject result = new JSONObject();
    String withComment =req.getParameter("withComment");
    if (!("true").equals(withComment)) {
      result.put("posts", new JSONArray(posts));
    } else {
      JSONArray postsArray = new JSONArray();
      for (Post post : posts) {
        List<Comment> comments = commentDao.getComments(post.getId());
        JSONObject postObject = new JSONObject(post);
        postObject.put("comments", new JSONArray(comments));
        postsArray.put(postObject);
      }
      result.put("posts", postsArray);
    }
    res.getWriter().println(result.toString());
  }

  private List<Post> getPostsBasedOnTime(HttpServletRequest req) {
    long maxCreationTime = Long.parseLong(req.getParameter("maxCreationTime"));
    int limit = Integer.parseInt(req.getParameter("limit"));
    List<Post> result = postDao.getPosts(maxCreationTime, limit);
    return result;
  }

  private List<Post> getPostsBasedOnLocation(HttpServletRequest req) {
    long maxCreationTime = Long.parseLong(req.getParameter("maxCreationTime"));
    int limit = Integer.parseInt(req.getParameter("limit"));
    double swLat = Double.parseDouble(req.getParameter("swLat"));
    double swLng = Double.parseDouble(req.getParameter("swLng"));
    double neLat = Double.parseDouble(req.getParameter("neLat"));
    double neLng = Double.parseDouble(req.getParameter("neLng"));
    Location southWest = new Location("", swLat, swLng);
    Location northEast = new Location("", neLat, neLng);

    List<Post> result = postDao.getPosts(southWest, northEast, maxCreationTime, limit);
    return result;
  }

  private List<Post> getPostsBasedOnUser(HttpServletRequest req) {
    long maxCreationTime = Long.parseLong(req.getParameter("maxCreationTime"));
    int limit = Integer.parseInt(req.getParameter("limit"));
    String userId = req.getParameter("userId");

    List<Post> result = postDao.getPosts(userId, maxCreationTime, limit);
    return result;
  }

  private List<Post> getPostsBasedOnTag(HttpServletRequest req) {
    long maxCreationTime = Long.parseLong(req.getParameter("maxCreationTime"));
    int limit = Integer.parseInt(req.getParameter("limit"));
    String tagName = req.getParameter("tagName");
    System.out.println(tagName);
    Tag tag = tagDao.getTag(tagName);
    if (tag == null)
      return null;
    System.out.println(tag.getId().toString());

    List<Post> result = postDao.getPosts(tag.getId(), maxCreationTime, limit);
    return result;
  }
}
