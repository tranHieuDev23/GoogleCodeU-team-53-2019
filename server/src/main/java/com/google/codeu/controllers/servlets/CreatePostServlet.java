package com.google.codeu.controllers.servlets;

import com.google.appengine.api.datastore.Link;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.*;
import com.google.codeu.controllers.storage.CloudStorageHelper;
import com.google.codeu.models.*;
import com.google.codeu.utils.*;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@WebServlet(ServletLink.API_CREATE_POST)
@MultipartConfig
public class CreatePostServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;
  private static final String BUCKET_NAME = "image_file_bucket";

  private UserService userService;
  private PostDao postDao;
  private UserDao userDao;
  private PostImageDao imageDao;
  private TagDao tagDao;
  private CloudStorageHelper storageHelper;
  private Gson gson;

  @Override
  public void init() throws ServletException {
    userService = UserServiceFactory.getUserService();
    postDao = new PostDao();
    userDao = new UserDao();
    imageDao = new PostImageDao();
    tagDao = new TagDao();
    storageHelper = CloudStorageHelper.getInstance();
    gson = new Gson();
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
    res.setContentType("application/json");

    if (!userService.isUserLoggedIn()) {
      res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return;
    }

    Post result = null;

    try {
      result = getPostFromRequest(req);
    } catch (Exception e) {
      System.out.println("Error while creating new Post!");
      e.printStackTrace();
      res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    }

    postDao.storePost(result);
    res.getWriter().println(gson.toJson(result));
  }

  private Post getPostFromRequest(HttpServletRequest req) throws IOException, ServletException {
    UUID postId = UUID.randomUUID();
    long creationTime = System.currentTimeMillis();

    String userId = userService.getCurrentUser().getUserId();
    User author = userDao.getUser(userId);

    String postDetailsJson = req.getParameter("postDetails");
    if (postDetailsJson == null) return null;
    JSONObject postDetails = new JSONObject(postDetailsJson);

    if (!postDetails.has("descriptionText")
        || !postDetails.has("imageDescriptions")
        || !postDetails.has("tags")) return null;

    String descriptionText = postDetails.getString("descriptionText");
    descriptionText = processDescriptionText(descriptionText);

    Location location = null;
    try {
      JSONObject locationJson = postDetails.getJSONObject("location");
      String placeId = locationJson.getString("placeId");
      double lat = locationJson.getDouble("lat");
      double lng = locationJson.getDouble("lng");
      location = new Location(placeId, lat, lng);
    } catch (JSONException e) {
      System.out.println("Cannot extract Location from request");
      e.printStackTrace();
    }

    JSONArray imageDescriptions = postDetails.getJSONArray("imageDescriptions");
    int imageCount = imageDescriptions.length();
    List<Part> fileParts = new ArrayList<>();
    for (int i = 0; i < imageCount; i++) {
      Part filePart = req.getPart("file-" + i);
      fileParts.add(filePart);
    }
    List<Link> imageUrls = storageHelper.uploadFiles(fileParts, BUCKET_NAME);
    List<PostImage> postImages = new ArrayList<>();
    for (int i = 0; i < imageCount; i++) {
      String description = imageDescriptions.getString(i);
      Link url = imageUrls.get(i);
      postImages.add(new PostImage(postId, url, description, i));
    }
    imageDao.storePostImages(postImages);

    JSONArray tagNames = postDetails.getJSONArray("tags");
    List<Tag> tags = new ArrayList<>();
    List<Tag> newTags = new ArrayList<>();
    for (int i = 0; i < tagNames.length(); i++) {
      String name = tagNames.getString(i);
      if (name == null) continue;
      Tag tag = tagDao.getTag(name);
      if (tag == null) {
        tag = new Tag(name);
        newTags.add(tag);
      }
      tags.add(tag);
    }
    if (!newTags.isEmpty()) tagDao.storeTags(newTags);

    List<String> likedUserIds = new ArrayList<>();

    Post result =
        new Post(
            postId,
            author,
            location,
            creationTime,
            descriptionText,
            postImages,
            tags,
            likedUserIds);
    return result;
  }

  private String processDescriptionText(String input) {
    /** Unescape input unto HTML format. */
    input = StringEscapeUtils.unescapeHtml4(input);
    String htmlString = UserInput.TransformToHTML(input);
    String userText = UserInput.sanitizingHtmlInput(htmlString);
    /** Create regular expression */
    String regex = "(https?://\\S+\\.(png|jpg))";
    /** replace any matches found in text */
    String replacement = "<img src=\"$1\" />";
    String textWithImagesReplaced = userText.replaceAll(regex, replacement);
    return textWithImagesReplaced;
  }
}
