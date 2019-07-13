package com.google.codeu.controllers.blobstore;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;

import java.io.InputStream;
import java.net.URL;
import java.util.List;

import java.util.Map;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Helper class to upload images to Blobstore.
 */
public class BlobstoreHelper {
    private static BlobstoreHelper SINGLETON_INSTANCE;

    /**
     * Retrieve an instance of class <code>BlobstoreHelper</code>. This
     * implementation follows the Singleton Design Pattern.
     * 
     * @return An instance of <code>BlobstoreHelper</code>.
     */
    public static BlobstoreHelper getInstance() {
        if (SINGLETON_INSTANCE == null)
            SINGLETON_INSTANCE = new BlobstoreHelper();
        return SINGLETON_INSTANCE;
    }

    private BlobstoreHelper() {
        // TODO: Implement constructor.
    }

    /**
     * Upload a list of image file to the Blobstore.
     * 
     * @param imageStreams List of byte streams describing the input images.
     * @return An array of <code>URL</code> to the location of the uploaded images.
     */

    private byte[] getBlobBytes(BlobKey blobKey) throws IOException {
        BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        ByteArrayOutputStream outputBytes = new ByteArrayOutputStream();

        int fetchSize = BlobstoreService.MAX_BLOB_FETCH_SIZE;
        long currentByteIndex = 0;
        boolean continueReading = true;
        // end index is inclusive, so we have to subtract 1 to get fetchSize bytes
        while(continueReading) {
            byte[] b = blobstoreService.fetchData(blobKey, currentByteIndex, currentByteIndex + fetchSize - 1);
            outputBytes.write(b);

            // if we read fewer bytes then we requested, the we reached the end
            if(b.length < fetchSize){
                continueReading = false;
            }

            currentByteIndex += fetchSize;
        }
        return outputBytes.toByteArray();
    }

    //public URL[] predictTags(List<InputStream> imageStreams) {
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
