package com.google.codeu.servlets;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * When the user submits the form, Blobstore process the uploaded file
 * and then forward the request to this servlet
 * This servlet can then process the request using the file URL we get from Blobstore
 */

@WebServlet("/my-form-handler")
public class FormHandlerServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Get message entered by user
        String message = request.getParameter("message");
        // Get URL of image that user uploaded to Blobstore
        String imageUrl = getUploadedFileUrl(request, "image");

        //Output HTML that shows the data that the user entered
        ServletOutputStream out = response.getOutputStream();
        
        out.println("<p>Here's the image you uploaded:</p>");
        out.println("<a href=\"" + imageUrl + "\">");
        out.println("<img src=\"" + imageUrl + "\" />");
        out.println("</a>");
        out.println("<p>Here's the text you entered:</p>");
        out.println(message);
    }

    /**
     * Returns a URL that points to the uploaded file, null if the user didn't upload a file
     */
    private String getUploadedFileUrl(HttpServletRequest request, String formInputElementName){
        BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
        List<BlobKey> blobKeys = blobs.get("image");

        if(blobKeys == null || blobKeys.isEmpty()){
            return null; 
        }
        // form only contains a single file input, so get the first index
        BlobKey blobKey = blobKeys.get(0);

        // User submitted form without selecting a file, so we cannot get the URL
        BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
        if(blobInfo.getSize() == 0){
            blobstoreService.delete(blobKey);
            return null;
        }
        
        // https://stackoverflow.com/q/10779564/873165
        // Use ImageService to get URL that points to the uploaded file
        ImagesService imagesService = ImagesServiceFactory.getImagesService();
        ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);
        return imagesService.getServingUrl(options);
    }
}
