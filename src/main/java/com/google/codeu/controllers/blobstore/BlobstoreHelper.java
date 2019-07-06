package com.google.codeu.controllers.blobstore;

import java.io.InputStream;
import java.net.URL;
import java.util.List;

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
    public URL[] predictTags(List<InputStream> imageStreams) {
        URL[] result = null;
        /**
         * TODO: Implement Blobstore upload here.
         */
        return result;
    }
}