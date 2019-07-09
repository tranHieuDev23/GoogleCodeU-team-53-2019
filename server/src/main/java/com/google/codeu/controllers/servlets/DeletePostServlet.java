package com.google.codeu.controllers.servlets;

import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.controllers.datastore.PostDao;
import com.google.codeu.utils.ServletLink;

@WebServlet(ServletLink.API_DELETE_POST)
public class DeletePostServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private PostDao postDao;

    @Override
    public void init() throws ServletException {
        postDao = new PostDao();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) {
        res.setContentType("application/json");
        UUID postId = UUID.fromString(req.getParameter("postId"));
        postDao.deletePost(postId);
    }
}