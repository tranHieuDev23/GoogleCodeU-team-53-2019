package com.google.codeu.controllers.servlets;

import java.io.IOException;
import java.io.InputStream;
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

import com.google.appengine.api.datastore.Link;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.*;
import com.google.codeu.utils.*;
import com.google.codeu.models.*;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;

import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(ServletLink.API_CREATE_POST)
@MultipartConfig
public class CreatePostServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private UserService userService;
    private PostDao postDao;
    private UserDao userDao;
    private PostImageDao imageDao;
    private TagDao tagDao;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        userService = UserServiceFactory.getUserService();
        postDao = new PostDao();
        userDao = new UserDao();
        imageDao = new PostImageDao();
        tagDao = new TagDao();
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
        if (postDetailsJson == null)
            return null;
        JSONObject postDetails = new JSONObject(postDetailsJson);

        if (!postDetails.has("descriptionText") || !postDetails.has("imageDescriptions") || !postDetails.has("tags"))
            return null;

        String descriptionText = postDetails.getString("descriptionText");
        descriptionText = StringEscapeUtils.escapeHtml4(descriptionText);
        descriptionText = UserInput.TransformToHTML(descriptionText);
        descriptionText = UserInput.sanitizingHtmlInput(descriptionText);

        Location location = null;
        if (postDetails.has("location")) {
            JSONObject locationJson = postDetails.getJSONObject("location");
            if (locationJson.has("placeId") && locationJson.has("lat") && locationJson.has("lng")) {
                String placeId = locationJson.getString("placeId");
                double lat = locationJson.getDouble("lat");
                double lng = locationJson.getDouble("lng");
                location = new Location(placeId, lat, lng);
            }
        }

        JSONArray imageDescriptions = postDetails.getJSONArray("imageDescriptions");
        int imageCount = imageDescriptions.length();
        List<InputStream> imageStreams = new ArrayList<>();
        for (int i = 0; i < imageCount; i++) {
            try {
                Part filePart = req.getPart("file-" + i);
                InputStream fileContent = filePart.getInputStream();
                imageStreams.add(fileContent);
            } catch (Exception e) {
                System.out.println("Error happens while handling image files!");
                e.printStackTrace();
            }
        }
        List<Link> imageUrls = new ArrayList<>();
        for (int i = 0; i < imageStreams.size(); i++) {
            imageUrls.add(new Link("/"));
        }
        /**
         * The abobe code is for testing purpose only. The servlet would call the helper
         * classes like this: imageUrls = blobstoreHelper.uploadFiles(imageStreams);
         */
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
            if (name == null)
                continue;
            Tag tag = tagDao.getTag(name);
            if (tag == null) {
                tag = new Tag(name);
                newTags.add(tag);
            }
            tags.add(tag);
        }
        if (!newTags.isEmpty())
            tagDao.storeTags(newTags);

        List<String> likedUserIds = new ArrayList<>();

        Post result = new Post(postId, author, location, creationTime, descriptionText, postImages, tags, likedUserIds);
        return result;
    }
}