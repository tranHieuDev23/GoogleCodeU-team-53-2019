package com.google.codeu.controllers.visionapi;

import java.io.InputStream;
//import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Collections;

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
import org.apache.commons.io.IOUtils;
import java.lang.*;


/**
 * Helper class to detect tags from images with Vision API.
 */
public class VisionAPIHelper implements Comparable<VisionAPIHelper> {
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
    
    String description;
    float score;
  
    @Override
    public int compareTo(VisionAPIHelper v) { //sorted by score ; descending order
        if (score < v.score)
            return 1;
        else if (score > v.score)
            return -1;
        return 0;
    }
  
    /**
     * Predict relevant labels from a list of images, using the Vision API.
     * 
     * @param imageStreams List of byte streams describing the input images.
     * @param maxResultCount The maximum number of results to return.
     * @return An array of predicted labels, sorted by relevance.
     */
    public List<String> predictLabels(List<InputStream> imageStreams, int maxResultCount) throws IOException {
        int length = imageStreams.size();
        int count = 0;
        int index = 0;
        VisionAPIHelper[] store = new VisionAPIHelper[5 * length];
        List<String> result = null;
        /**
         * TODO: Implement label prediction, using Vision API here. There should not be
         * any duplicate in the result.
         */

        //get api result for each image in the list
        for(int i=0; i<length; i++){
            int j = 0;
          
            byte[] imageBytesArray = IOUtils.toByteArray(imageStreams.get(i));
            ByteString imageBytes = ByteString.copyFrom(imageBytesArray);
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

            //store all result labels in form of "score+description"
            for (EntityAnnotation annotation : imageResponse.getLabelAnnotationsList()) {
                VisionAPIHelper v = new VisionAPIHelper();
                v.description = annotation.getDescription();
                v.score = annotation.getScore();
                store[j] = v;
                //allow max 5 tages per one image
                if (j % 5 == 4)
                  break;
                else
                  j++;
            }
        }

        //sort stored results by relevance order
        Arrays.sort(store);

        //get decription(tags) without duplicates until 'count' reach 'maxResultCount'
        while (count != maxResultCount){
            String data = store[index].description;
            if (result.contains(data))
                index += 1;
            else{
                result.add(data);
                count += 1;
                index += 1;
            }
        }
        
        return result;
    }
}
