package com.google.codeu.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.codeu.data.UserInput;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Handles fetching and saving {@link NewMessage} instances. */
@WebServlet("/newMessages")
public class NewMessageServlet extends MessageServlet {

  /** Stores a new {@link newMessage}. */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/index.html");
      return;
    }

    String user = userService.getCurrentUser().getEmail();
    String input = request.getParameter("text"); //markdown  input
    String htmlString = UserInput.TransformToHTML(input);
    String text = UserInput.sanitizingHtmlInput(htmlString);

    Message message = new Message(user, text);
    Datastore datastore = getDatastore();
    datastore.storeMessage(message);

    response.sendRedirect("/user-page.html?user=" + user);
  }
}
