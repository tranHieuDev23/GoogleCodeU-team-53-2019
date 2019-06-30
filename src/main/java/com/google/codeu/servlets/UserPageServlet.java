package com.google.codeu.servlets;

import java.io.IOException;
import java.util.List;

import com.google.codeu.data.Datastore;
import com.google.codeu.data.User;
import com.google.codeu.data.Message;

import com.google.gson.Gson;

import javax.servlet.RequestDispatcher;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/users/*")

public class UserPageServlet extends HttpServlet  {
  private Datastore datastore;

  @Override
  public void init() {
    datastore = new Datastore();
  }

  /** Responds with the "about me" section for a particular user.*/
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    //response.setContentType("text/html");
    response.setContentType(("application/json"));
    String requestUrl = request.getRequestURI();
    String user = requestUrl.substring("/users/".length());
    System.out.println(user);
    request.setAttribute("username", user);

    if (user == null || user.equals(""))  {
      // Request is invalid, return empty response
      return;
    }

    List<Message> messages = datastore.getMessages(user);

    request.setAttribute("messages", messages);

    //response.getOutputStream().println(user);
    System.out.println("DEBUG");
    try {
      RequestDispatcher requestDispatcher = request.getRequestDispatcher("/WEB-INF/userpage.jsp");
      if (requestDispatcher == null)  {
        System.out.println("FALL");
      }
      else  {
        System.out.println("NOT FALL");
        requestDispatcher.forward(request, response);
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
      System.out.println("FALL!!!");
    }
    
  }
}