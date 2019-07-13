package com.google.codeu.servlets;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/home")
public class HomeServlet extends HttpServlet {
  /**
   * Returns HTML that contains a form. The form submits to Blobstore, which redirects to
   * /my-form-handler, handled by FormHandlerServlet
   */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get Blobstore URL
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    String uploadUrl = blobstoreService.createUploadUrl("/my-form-handler");

    response.setContentType("text/html");
    // demonstrate creating a form that uses the Blobstore URL
    ServletOutputStream out = response.getOutputStream();
    out.println(
        "<form method=\"POST\" enctype=\"multipart/form-data\" action=\"" + uploadUrl + "\">");

    out.println("<p>Type some text:</p>");
    out.println("<textarea name=\"message\"></textarea>");
    out.println("<br/>");

    out.println("<p>Upload an image:</p>");
    out.println("<input type=\"file\" name=\"image\">");
    out.println("<br/><br/>");

    out.println("<button>Submit</button>");
    out.println("</form>");
  }
}
