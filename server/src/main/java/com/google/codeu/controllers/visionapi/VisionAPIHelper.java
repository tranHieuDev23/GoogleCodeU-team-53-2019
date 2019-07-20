package com.google.codeu.controllers.visionapi;

import java.io.InputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Feature.Type;
import com.google.codeu.utils.TagUtils;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;

import com.google.protobuf.ByteString;
import org.apache.commons.io.IOUtils;

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
    // Auto-generated
  }

  private class Result implements Comparable<Result> {
    String description;
    float score;

    @Override
    public int compareTo(Result r) { // Sorted by score; descending order
      if (score < r.score)
        return 1;
      else if (score > r.score)
        return -1;
      return 0;
    }
  }

  /**
   * Predict relevant tags from a list of images, using the Vision API.
   * 
   * @param imageStreams   List of byte streams describing the input images.
   * @param maxResultCount The maximum number of results to return.
   * @return An array of predicted tags, sorted by relevance.
   */
  public List<String> predictTags(List<InputStream> imageStreams, int maxResultCount) throws IOException {
    int length = imageStreams.size();
    int count = 0;
    int index = 0;
    List<Result> resultList = new ArrayList<>();
    List<String> result = new ArrayList<>();

    // Get API result for each image in the list
    for (int i = 0; i < length; i++) {
      byte[] imageBytesArray = IOUtils.toByteArray(imageStreams.get(i));
      ByteString imageBytes = ByteString.copyFrom(imageBytesArray);
      Image image = Image.newBuilder().setContent(imageBytes).build();

      Feature feature = Feature.newBuilder().setType(Type.LABEL_DETECTION).build();
      AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();
      List<AnnotateImageRequest> requests = new ArrayList<>();
      requests.add(request);

      ImageAnnotatorClient client = ImageAnnotatorClient.create();
      BatchAnnotateImagesResponse batchResponse = client.batchAnnotateImages(requests);
      List<AnnotateImageResponse> imageResponses = batchResponse.getResponsesList();
      AnnotateImageResponse imageResponse = imageResponses.get(0);

      if (imageResponse.hasError()) {
        System.out.println("Error: " + imageResponse.getError().getMessage());
      }

      // Store result tags as object
      for (EntityAnnotation annotation : imageResponse.getLabelAnnotationsList()) {
        Result r = new Result();
        r.description = annotation.getDescription();
        r.description = TagUtils.slugify(r.description);
        r.score = annotation.getScore();
        resultList.add(r);
      }
    }

    // Sort stored results by relevance order
    Collections.sort(resultList);

    // Get decription (tags) without duplicates until count reach maxResultCount
    while (count != maxResultCount) {
      String data = resultList.get(index).description;
      if (result.contains(data))
        index += 1;
      else {
        result.add(data);
        count += 1;
        index += 1;
      }
    }

    return result;
  }
}
