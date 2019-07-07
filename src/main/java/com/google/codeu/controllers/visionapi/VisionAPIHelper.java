package com.google.codeu.controllers.visionapi;

//import java.io.InputStream;
//import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.LocationInfo;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Feature.Type;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;

import com.google.protobuf.ByteString;


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
        // Auto-generated
    }

    /**
     * Predict relevant labels from a list of images, using the Vision API.
     * 
     * @param imageStreams   Byte streams describing the input images.
     * @param maxResultCount The maximum number of results to return.
     * @return An array of predicted labels, sorted by relevance.
     */
    public List predictLabels(byte[] imageStreams, int maxResultCount) throws IOException {
        List result = null;
        /**
         * TODO: Implement label prediction, using Vision API here. There should not be
         * any duplicate in the result.
         */
        
        ByteString imageBytes = ByteString.copyFrom(imageStreams);
        Image image = Image.newBuilder().setContent(imageBytes).build();

        Feature feature = Feature.newBuilder().setType(Type.LABEL_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();
        List<AnnotateImageRequest> requests = new ArrayList<>();
        requests.add(request);

        ImageAnnotatorClient client =ImageAnnotatorClient.create();
        BatchAnnotateImagesResponse batchResponse = client.batchAnnotateImages(requests);
        List<AnnotateImageResponse> imageResponses = batchResponse.getResponsesList();
        AnnotateImageResponse imageResponse = imageResponses.get(0);

        if (imageResponse.hasError()) {
            System.out.println("Error: " + imageResponse.getError().getMessage());
        }

        for (EntityAnnotation annotation : imageResponse.getLabelAnnotationsList()) {
            result = Arrays.asList(annotation.getDescription());
        }

        return result.subList(0, maxResultCount);
    }

    /**
     * Predict relevant landmark infos from a list of images, using the Vision API.
     * 
     * @param imageStreams   Byte streams describing the input images.
     * @return A string of predicted landmark infos, in form of "landmark , latitude: longitude:".
     */
    public String predictLandmarks(byte[] imageStreams) throws IOException {
        String result = null;
        /**
         * TODO: Implement landmark prediction, using Vision API here. There should not be
         * any duplicate in the result.
         */
        
        ByteString imageBytes = ByteString.copyFrom(imageStreams);
        Image image = Image.newBuilder().setContent(imageBytes).build();

        Feature feature = Feature.newBuilder().setType(Type.LABEL_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();
        List<AnnotateImageRequest> requests = new ArrayList<>();
        requests.add(request);

        ImageAnnotatorClient client =ImageAnnotatorClient.create();
        BatchAnnotateImagesResponse batchResponse = client.batchAnnotateImages(requests);
        List<AnnotateImageResponse> imageResponses = batchResponse.getResponsesList();
        AnnotateImageResponse imageResponse = imageResponses.get(0);

        if (imageResponse.hasError()) {
            System.out.println("Error: " + imageResponse.getError().getMessage());
        }
        
        for (EntityAnnotation annotation : imageResponse.getLandmarkAnnotationsList()) {
            LocationInfo info = annotation.getLocationsList().listIterator().next();
            result = annotation.getDescription() + "," + info.getLatLng();
        }

        return result;
    }
}