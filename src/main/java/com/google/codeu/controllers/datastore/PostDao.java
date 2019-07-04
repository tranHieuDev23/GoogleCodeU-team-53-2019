package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.codeu.models.*;

public class PostDao {

    private static final String ENTITY_KIND = "Post";
    private static final String PROPERTY_NAME_USER_ID = "UserId";
    private static final String PROPERTY_NAME_LOCATION_ID = "LocationId";
    private static final String PROPERTY_NAME_CREATION_TIME = "CreationTime";
    private static final String PROPERTY_NAME_DESCRIPTION_TEXT = "DescriptionText";
    private static final String PROPERTY_NAME_TAGS = "Tags";

    private DatastoreService datastore;
    private UserDao userDao;
    private PostImageDao postImageDao;
    private TagDao tagDao;

    public PostDao() {
        datastore = DatastoreServiceFactory.getDatastoreService();
        userDao = new UserDao();
        postImageDao = new PostImageDao();
        tagDao = new TagDao();
    }

    public void storePost(Post post) {
        Entity entity = new Entity(ENTITY_KIND, post.getId().toString());
        entity.setProperty(PROPERTY_NAME_USER_ID, post.getAuthor().getId());
        entity.setProperty(PROPERTY_NAME_LOCATION_ID, post.getLocation().getPlaceId());
        entity.setProperty(PROPERTY_NAME_CREATION_TIME, post.getCreationTime());
        entity.setProperty(PROPERTY_NAME_DESCRIPTION_TEXT, post.getDescriptionText());
        entity.setProperty(PROPERTY_NAME_TAGS, getIdsFromTags(post.getTags()));
        datastore.put(entity);

        postImageDao.storePostImages(post.getPostImages());
        tagDao.storeTags(post.getTags());
    }

    public Post getPost(UUID id) {
        Query query = new Query(ENTITY_KIND)
                .setFilter(new Query.FilterPredicate("__key__", FilterOperator.EQUAL, id.toString()));

        PreparedQuery result = datastore.prepare(query);
        Entity entity = result.asSingleEntity();
        if (entity == null)
            return null;

        String userId = (String) entity.getProperty(PROPERTY_NAME_USER_ID);
        User author = userDao.getUser(userId);

        String locationId = (String) entity.getProperty(PROPERTY_NAME_LOCATION_ID);
        Location location = new Location(locationId);

        long creationTime = (long) entity.getProperty(PROPERTY_NAME_CREATION_TIME);
        String descriptionText = (String) entity.getProperty(PROPERTY_NAME_DESCRIPTION_TEXT);

        List<PostImage> postImages = postImageDao.getPostImages(id);

        @SuppressWarnings("unchecked")
        List<String> tagIds = (List<String>) entity.getProperty(PROPERTY_NAME_TAGS);
        List<Tag> tags = getTagsFromIds(tagIds);

        Post post = new Post(id, author, location, creationTime, descriptionText, postImages, tags, null);
        return post;
    }

    private List<String> getIdsFromTags(List<Tag> tags) {
        List<String> result = new ArrayList<>();
        for (Tag t : tags)
            result.add(t.getId().toString());
        return result;
    }

    private List<Tag> getTagsFromIds(List<String> ids) {
        List<Tag> result = new ArrayList<>();
        for (String id : ids) {
            Tag tag = tagDao.getTag(UUID.fromString(id));
            if (tag != null)
                result.add(tag);
        }
        return result;
    }
}