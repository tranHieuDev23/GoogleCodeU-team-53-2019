package com.google.codeu.controllers.servlets;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.controllers.datastore.PostDao;
import com.google.codeu.models.Post;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;

@WebServlet(ServletLink.API_RETRIEVE_POST)
public class RetrievePostServlet extends HttpServlet {

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

        UUID postId = UUID.fromString(req.getParameter("postId"));
        Post result = postDao.getPost(postId);

        res.getWriter().println(gson.toJson(result));
    }
}