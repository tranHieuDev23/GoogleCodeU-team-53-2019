package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.Comparator;
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
    private static final String PROPERTY_NAME_ORDER_IN_POST = "OrderInPost";

    private DatastoreService datastore;

    public PostImageDao() {
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

    public void storePostImages(List<PostImage> images) {
        if (images == null)
            return;

        List<Entity> entities = new ArrayList<Entity>();
        for (PostImage image : images) {
            Entity entity = new Entity(ENTITY_KIND, image.getId().toString());
            entity.setProperty(PROPERTY_NAME_POST_ID, image.getPostId().toString());
            entity.setProperty(PROPERTY_NAME_IMAGE_URL, image.getImageUrl().toString());
            entity.setProperty(PROPERTY_NAME_IMAGE_DESCRIPTION, image.getImageDescription());
            entity.setProperty(PROPERTY_NAME_ORDER_IN_POST, image.getOrderInPost());
            entities.add(entity);
        }
        datastore.put(entities);
    }

    public List<PostImage> getPostImages(UUID postId) {
        if (postId == null)
            return new ArrayList<>();

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
                long orderInPost = (long) entity.getProperty(PROPERTY_NAME_ORDER_IN_POST);

                PostImage image = new PostImage(id, postId, imageUrl, descriptionText, orderInPost);
                images.add(image);
            } catch (Exception e) {
                System.err.println("Error reading image.");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }

        images.sort(new Comparator<PostImage>() {
            @Override
            public int compare(PostImage o1, PostImage o2) {
                return Long.compare(o1.getOrderInPost(), o2.getOrderInPost());
            }
        });
        return images;
    }
}