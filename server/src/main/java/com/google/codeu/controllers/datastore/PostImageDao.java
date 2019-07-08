package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.codeu.models.PostImage;

public class PostImageDao {

    private static final String ENTITY_KIND = "PostImage";
    private static final String PROPERTY_NAME_POST_ID = "PostId";
    private static final String PROPERTY_NAME_IMAGE_URL = "ImageURL";
    private static final String PROPERTY_NAME_IMAGE_DESCRIPTION = "ImageDescription";

    private DatastoreService datastore;

    public PostImageDao() {
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

    public void storePostImages(List<PostImage> images) {
        List<Entity> entities = new ArrayList<Entity>();
        for (PostImage image : images) {
            Entity entity = new Entity(ENTITY_KIND, image.getId().toString());
            entity.setProperty(PROPERTY_NAME_POST_ID, image.getPostId().toString());
            entity.setProperty(PROPERTY_NAME_IMAGE_URL, image.getImageUrl().toString());
            entity.setProperty(PROPERTY_NAME_IMAGE_DESCRIPTION, image.getImageDescription());
            entities.add(entity);
        }
        datastore.put(entities);
    }

    public List<PostImage> getPostImages(UUID postId) {
        Query query = new Query(ENTITY_KIND)
                .setFilter(new Query.FilterPredicate(PROPERTY_NAME_POST_ID, FilterOperator.EQUAL, postId.toString()));
        PreparedQuery results = datastore.prepare(query);
        List<PostImage> images = new ArrayList<>();
        for (Entity entity : results.asIterable()) {
            try {
                String idString = entity.getKey().getName();
                UUID id = UUID.fromString(idString);
                Link imageUrl = new Link((String) entity.getProperty(PROPERTY_NAME_IMAGE_URL));
                String descriptionText = (String) entity.getProperty(PROPERTY_NAME_IMAGE_DESCRIPTION);

                PostImage image = new PostImage(id, postId, imageUrl, descriptionText);
                images.add(image);
            } catch (Exception e) {
                System.err.println("Error reading image.");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }
        return images;
    }
}