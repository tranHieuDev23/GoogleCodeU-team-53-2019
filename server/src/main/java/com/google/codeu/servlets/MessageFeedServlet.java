package com.google.codeu.servlets;

import com.google.codeu.data.*;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Handles fetching all messages for the public feed. */
@WebServlet("/feed")
public class MessageFeedServlet extends HttpServlet {

  private Datastore datastore;

  @Override
  public void init() {
    this.datastore = new Datastore();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType(("application/json"));

    List<Message> messages = datastore.getAllMessage();
    Gson gson = new Gson();
    String json = gson.toJson(messages);

    response.getOutputStream().println(json);
  }
}
