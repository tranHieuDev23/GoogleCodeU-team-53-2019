package com.google.codeu.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.codeu.data.GeoMessage;
import com.google.codeu.data.UserInput;

import org.apache.commons.text.StringEscapeUtils;

@WebServlet("/geomessages")
public class GeoMessageServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        List<GeoMessage> result = GeoMessage.getGeoMessages();
        Gson gson = new Gson();
        String json = gson.toJson(result);

        response.getWriter().println(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        if (!userService.isUserLoggedIn()) {
            response.sendRedirect("/index.html");
            return;
        }

        String user = userService.getCurrentUser().getEmail();
        double latitude = Double.parseDouble(request.getParameter("latitude"));
        double longitude = Double.parseDouble(request.getParameter("longitude"));
        String input = request.getParameter("text");

        /** Unescape input unto HTML format. */
        input = StringEscapeUtils.unescapeHtml4(input);
        String htmlString = UserInput.TransformToHTML(input);
        String userText = UserInput.sanitizingHtmlInput(htmlString);

        /** Create regular expression */
        String regex = "(https?://\\S+\\.(png|jpg))";
        /** replace any matches found in text */
        String replacement = "<img src=\"$1\" />";
        String textWithImagesReplaced = userText.replaceAll(regex, replacement);

        GeoMessage message = new GeoMessage(user, latitude, longitude, textWithImagesReplaced);
        GeoMessage.storeGeoMessage(message);

        response.sendRedirect("/user-page.html?user=" + user);
    }
}