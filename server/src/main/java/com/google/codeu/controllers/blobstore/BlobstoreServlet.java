package com.google.codeu.controllers.blobstore;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;

import com.google.protobuf.ByteString;

import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.net.URL;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * When the user submits the form, Blobstore processes the file upload
 * and then forwards the request to this servlet. This servlet can then
 * analyze the image using the Vision API.
 */
// add List<InputStream> imageStreams to parameter
@WebServlet("/image-processing")
public class BlobstoreServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    PrintWriter out = response.getWriter();

    // Get the message entered by the user.
    String message = request.getParameter("message");

    // Get the BlobKey that points to the image uploaded by the user.
    BlobKey blobKey = getBlobKey(request, "image");

    // User didn't upload a file, so render an error message.
    if(blobKey == null) {
      out.println("Please upload an image file.");
      return;
    }

    // Get the URL of the image that the user uploaded.
    //String imageUrl = getUploadedFileUrl(blobKey);
    String imageUrl = predictTags(blobKey);
    
    // Get the labels of the image that the user uploaded.
    // byte[] blobBytes -> imagesStreams
    //byte[] blobBytes = getBlobBytes(blobKey)
    //getImageLabels() -> predictLabels()
    //List<EntityAnnotation> imageLabels = predictLabels(imageStreams);

    // Output some HTML that shows the data the user entered.
    // A real codebase would probably store these in Datastore.
    response.setContentType("text/html");
    out.println("<p>Here's the image you uploaded:</p>");
    out.println("<a href=\"" + imageUrl + "\">");
    out.println("<img src=\"" + imageUrl + "\" />");
    out.println("</a>");
    out.println("<p>Here are the labels we extracted:</p>");
    
    /**out.println("<ul>");
    for(EntityAnnotation label : imageLabels){
      out.println("<li>" + label.getDescription() + " " + label.getScore());
    }
    out.println("</ul>");
    */
  }
  /**
     * Returns BlobKey that points to the file uploaded up user,
     * null if the user did not upload a file
     */
    private BlobKey getBlobKey(HttpServletRequest request, String formInputElementName) {
        BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
        List<BlobKey> blobKeys = blobs.get("image");

        /**
         * User submitted form without selecting a file
         * so we cannot get a blobKey (devserver)
         */
        if(blobKeys == null || blobKeys.isEmpty()) {
            return null;
        }

        // Our form only contains a single file input, get first index
        BlobKey blobKey = blobKeys.get(0);

        /**
         * User submitted a form without selecting a file
         * so the BlobKey is empty (live server)
         */
        BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
        if (blobInfo.getSize() == 0) {
            blobstoreService.delete(blobKey);
            return null;
        }
        return blobKey;
    }
    public String predictTags(BlobKey blobKey) {
        //URL[] result = null;
        /**
         * TODO: Implement Blobstore upload here.
         */
        // Use ImageService to get URL that points to the uploaded file
        ImagesService imagesService = ImagesServiceFactory.getImagesService();
        ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);
        String result = imagesService.getServingUrl(options);
        return result;
    }
}
