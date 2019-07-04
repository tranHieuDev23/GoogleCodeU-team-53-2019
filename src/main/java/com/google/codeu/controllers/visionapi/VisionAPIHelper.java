package com.google.codeu.controllers.visionapi;

import java.io.InputStream;
import java.util.List;

/**
 * Helper class to detect tags from images with Vision API.
 */
public class VisionAPIHelper {
    private static VisionAPIHelper SINGLETON_INSTANCE;

    /**
     * Retrieve an instance of class <code>VisionAPIHelper</code>. This
     * implementation follows the Singleton Design Pattern.
     * 
     * @return An instance of <code>VisionAPIHelper</code>.
     */
    public static VisionAPIHelper getInstance() {
        if (SINGLETON_INSTANCE == null)
            SINGLETON_INSTANCE = new VisionAPIHelper();
        return SINGLETON_INSTANCE;
    }

    private VisionAPIHelper() {
        // TODO: Implement constructor.
    }

    /**
     * Predict relevant tags from a list of images, using the Vision API.
     * 
     * @param imageStreams List of byte streams describing the input images.
     * @return An array of predicted tags, sorted by relevance.
     */
    public String[] predictTags(List<InputStream> imageStreams) {
        String[] result = null;
        /**
         * TODO: Implement tag prediction, using Vision API here. There should not be
         * any duplicate in the result.
         */
        return result;
    }
}