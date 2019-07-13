package com.google.codeu.controllers.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.controllers.datastore.UserDao;
import com.google.codeu.models.User;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;

@WebServlet(ServletLink.API_RETRIEVE_USER)
public class RetrieveUserServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private UserDao userDao;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        userDao = new UserDao();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        String userId = req.getParameter("userId");
        User result = userDao.getUser(userId);
        res.getWriter().println(gson.toJson(result));
    }
}