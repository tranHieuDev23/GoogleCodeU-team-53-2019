package com.google.codeu.controllers.storage;

import com.google.appengine.api.datastore.Link;
import com.google.cloud.storage.*;
import com.google.cloud.storage.Acl.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.Part;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

// [START example]
public class CloudStorageHelper {

    private static CloudStorageHelper SINGLETON_INSTANCE;

    /**
     * Retrieve an instance of class <code>StorageHelper</code>. This implementation
     * follows the Singleton Design Pattern.
     * 
     * @return An instance of <code>StorageHelper</code>.
     */
    public static CloudStorageHelper getInstance() {
        if (SINGLETON_INSTANCE == null)
            SINGLETON_INSTANCE = new CloudStorageHelper();
        return SINGLETON_INSTANCE;
    }

    private Storage storage = null;

    private CloudStorageHelper() {
        storage = StorageOptions.getDefaultInstance().getService();
    }

    /**
     * Uploads a file part to Google Cloud Storage to the bucket specified in the
     * <code>bucketName</code> variable, appending a timestamp to end of the
     * uploaded filename.
     * 
     * @param filePart   The file part extracted from a request.
     * @param bucketName Name of the bucket to upload to.
     * @return A <code>Link</code> object representing the URL to the uploaded file.
     * @throws StorageException
     * @throws IOException
     */
    @SuppressWarnings("deprecation")
    public Link uploadFile(Part filePart, final String bucketName) throws StorageException, IOException {
        String extension = FilenameUtils.getExtension(filePart.getSubmittedFileName());
        final String fileName = generateRandomName(extension);

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName)
                // Modify access list to allow all users with link to read file
                .setAcl(new ArrayList<>(Arrays.asList(Acl.of(User.ofAllUsers(), Role.READER)))).build();
        // the inputstream is closed by default, so we don't need to close it here
        Blob blob = storage.create(blobInfo, filePart.getInputStream());
        // return the public download link
        return new Link(blob.getMediaLink());
    }

    /**
     * Uploads a <code>List</code> of file parts to Google Cloud Storage to the
     * bucket specified in the <code>bucketName</code> variable, appending a
     * timestamp to end of each uploaded filename.
     * 
     * @param fileParts  The <code>List</code> of file parts to upload.
     * @param bucketName Name of the bucket to upload to.
     * @return A <code>List</code> of <code>Link</code> objects representing the
     *         URLs to the uploaded files, in the same order in as they were in the
     *         input.
     * @throws StorageException
     * @throws IOException
     */
    public List<Link> uploadFiles(List<Part> fileParts, final String bucketName) throws StorageException, IOException {
        List<Link> results = new ArrayList<>();
        for (Part part : fileParts) {
            results.add(uploadFile(part, bucketName));
        }
        return results;
    }

    private String generateRandomName(String extension) {
        DateTimeFormatter dtf = DateTimeFormat.forPattern("-YYYY-MM-dd-HHmmssSSS");
        DateTime dt = DateTime.now(DateTimeZone.UTC);
        String dtString = dt.toString(dtf);
        final String fileName = RandomStringUtils.randomAlphanumeric(8) + dtString + '.' + extension;
        return fileName;
    }
}
