package com.google.codeu.controllers.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.controllers.datastore.*;
import com.google.codeu.models.*;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;

@WebServlet(ServletLink.API_CREATE_POST)
public class CreatePostServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private PostDao postDao;
    private UserDao userDao;
    private PostImageDao imageDao;
    private TagDao tagDao;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        postDao = new PostDao();
        userDao = new UserDao();
        imageDao = new PostImageDao();
        tagDao = new TagDao();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");

        UserService userService = UserServiceFactory.getUserService();
        String userId = userService.getCurrentUser().getUserId();
        User author = userDao.getUser(userId);

        String placeId = req.getParameter("placeId");
        double lat = Double.parseDouble(req.getParameter("lat"));
        double lng = Double.parseDouble(req.getParameter("lng"));
        Location location = new Location(placeId, lat, lng);

        String descriptionText = req.getParameter("descriptionText");

        List<PostImage> postImages = new ArrayList<>();
        // TODO: Handle image uploading here
        imageDao.storePostImages(postImages);

        String[] tagNames = req.getParameterValues("tags");
        List<Tag> tags = new ArrayList<>();
        List<Tag> newTags = new ArrayList<>();
        for (String name : tagNames) {
            Tag tag = tagDao.getTag(name);
            if (tag == null)
            {
                tag = new Tag(name);
                newTags.add(tag);
            }
            tags.add(tag);
        }
        if (!newTags.isEmpty())
            tagDao.storeTags(newTags);

        Post result = new Post(author, location, descriptionText, postImages, tags);
        postDao.storePost(result);

        res.getWriter().println(gson.toJson(result));
    }
}