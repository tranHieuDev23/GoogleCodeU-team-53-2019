package com.google.codeu.controllers.servlets;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.controllers.datastore.PostDao;
import com.google.codeu.models.Location;
import com.google.codeu.models.Post;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;

@WebServlet(ServletLink.API_RETRIEVE_POSTS)
public class RetrievePostsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private PostDao postDao;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        postDao = new PostDao();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");

        List<Post> result = null;
        if (req.getParameterMap().containsKey("sw"))
            result = getPostsBasedOnLocation(req);
        if (req.getParameterMap().containsKey("userId"))
            result = getPostsBasedOnUser(req);
        if (req.getParameterMap().containsKey("tagId"))
            result = getPostsBasedOnTag(req);

        res.getWriter().println(gson.toJson(result));
    }

    private List<Post> getPostsBasedOnLocation(HttpServletRequest req) {
        long maxCreationTime = Long.parseLong(req.getParameter("maxCreationTime"));
        int limit = Integer.parseInt(req.getParameter("limit"));
        double swLat = Double.parseDouble(req.getParameter("sw.lat"));
        double swLng = Double.parseDouble(req.getParameter("sw.lng"));
        double neLat = Double.parseDouble(req.getParameter("ne.lat"));
        double neLng = Double.parseDouble(req.getParameter("ne.lng"));
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
        UUID tagId = UUID.fromString(req.getParameter("tagId"));

        List<Post> result = postDao.getPosts(tagId, maxCreationTime, limit);
        return result;
    }

}