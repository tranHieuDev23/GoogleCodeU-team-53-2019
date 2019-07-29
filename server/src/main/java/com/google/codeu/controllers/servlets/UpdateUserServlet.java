package com.google.codeu.controllers.servlets;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import com.google.codeu.controllers.datastore.UserDao;
import com.google.codeu.controllers.storage.CloudStorageHelper;
import com.google.codeu.models.User;
import com.google.codeu.utils.ServletLink;
import com.google.codeu.utils.UserJsonifier;

@WebServlet(ServletLink.API_UPDATE_USER)
@MultipartConfig
public class UpdateUserServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private static final String BUCKET_NAME = "image_file_bucket";

    private DateFormat dateFormat;
    private UserService userService;
    private UserDao userDao;
    private CloudStorageHelper storageHelper;

    @Override
    public void init() throws ServletException {
        dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        userService = UserServiceFactory.getUserService();
        userDao = new UserDao();
        storageHelper = CloudStorageHelper.getInstance();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (!userService.isUserLoggedIn()) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        String userId = userService.getCurrentUser().getUserId();
        User user = userDao.getUser(userId);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        try {
            String username = req.getParameter("username");
            if (username.isEmpty())
                throw new RuntimeException("username cannot be empty!");
            String birthdateString = req.getParameter("birthdate");
            Date birthdate = (!birthdateString.equals("") ? dateFormat.parse(req.getParameter("birthdate")) : null);
            String bioText = req.getParameter("bioText");
            Part avatarPart = req.getPart("avatar");
            Link avatarUrl = null;
            if (avatarPart != null) {
                avatarUrl = storageHelper.uploadFile(avatarPart, BUCKET_NAME);
            } else {
                avatarUrl = user.getAvatarUrl();
            }
            user = new User(userId, username, birthdate, bioText, avatarUrl);
        } catch (Exception e) {
            System.out.print("Exception while updating user!");
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        userDao.updateUser(user);
        resp.setContentType("application/json");
        resp.getWriter().println(UserJsonifier.jsonify(user).toString());
    }
}