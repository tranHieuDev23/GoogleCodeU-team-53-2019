package com.google.codeu.controllers.storage;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Acl.Role;
import com.google.cloud.storage.Acl.User;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.InputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

// [START example]
public class CloudStorageHelper {
    
    private static CloudStorageHelper SINGLETON_INSTANCE;

    /**
     * Retrieve an instance of class <code>StorageHelper</code>. This
     * implementation follows the Singleton Design Pattern.
     * 
     * @return An instance of <code>StorageHelper</code>.
     */
    public static CloudStorageHelper getInstance() {
        if (SINGLETON_INSTANCE == null)
            SINGLETON_INSTANCE = new CloudStorageHelper();
        return SINGLETON_INSTANCE;
    }
    public static Storage storage = null;
    static {
        storage = StorageOptions.getDefaultInstance().getService();
    }

    private CloudStorageHelper() {
        // TODO: Implement constructor.
    }

    /**
     * Upload a list of image file to the Storage.
     * 
     * @param imageStreams List of byte streams describing the input images.
     * @return An array of <code>URL</code> to the location of the uploaded images.
     */
    //TODO: Implement Storage upload here
    /**
    public URL[] predictTags(List<InputStream> imageStreams) {
        URL[] result = null;
        return result;
    }*/
    //https://stackoverflow.com/questions/49082384/java-google-cloud-storage-upload-media-link-null-but-image-uploads
  /**
   * Uploads a file to Google Cloud Storage to the bucket specified in the BUCKET_NAME
   * environment variable, appending a timestamp to end of the uploaded filename.
   */
  @SuppressWarnings("deprecation")
    //public String predictTags(List<InputStream> imageStreams, Part filePart, final String bucketName){  
 public String uploadFile(Part filePart, final String bucketName) throws IOException {
    DateTimeFormatter dtf = DateTimeFormat.forPattern("-YYYY-MM-dd-HHmmssSSS");
    DateTime dt = DateTime.now(DateTimeZone.UTC);
    String dtString = dt.toString(dtf);
    final String fileName = filePart.getSubmittedFileName() + dtString;

    // the inputstream is closed by default, so we don't need to close it here
    BlobInfo blobInfo =
        storage.create(
            BlobInfo
                .newBuilder(bucketName, fileName)
                // Modify access list to allow all users with link to read file
                .setAcl(new ArrayList<>(Arrays.asList(Acl.of(User.ofAllUsers(), Role.READER))))
                .build(),
            filePart.getInputStream());
            //imageStreams
    // return the public download link
    return blobInfo.getMediaLink();
  }
  // [END uploadFile]

  // [START getImageUrl]

  /**
   * Extracts the file payload from an HttpServletRequest, checks that the file extension
   * is supported and uploads the file to Google Cloud Storage.
   */
  public String getImageUrl(HttpServletRequest req, HttpServletResponse resp,
                            final String bucket) throws IOException, ServletException {
    Part filePart = req.getPart("file");
    final String fileName = filePart.getSubmittedFileName();
    String imageUrl = req.getParameter("imageUrl");
    // Check extension of file
    if (fileName != null && !fileName.isEmpty() && fileName.contains(".")) {
      final String extension = fileName.substring(fileName.lastIndexOf('.') + 1);
      String[] allowedExt = {"jpg", "jpeg", "png", "gif"};
      for (String s : allowedExt) {
        if (extension.equals(s)) {
          return this.uploadFile(filePart, bucket);
        }
      }
      throw new ServletException("file must be an image");
    }
    return imageUrl;
  }
  // [END getImageUrl]
}
