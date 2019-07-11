package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.*;
import com.google.codeu.models.*;

public class PostDao {

    private static final String ENTITY_KIND = "Post";
    private static final String PROPERTY_NAME_USER_ID = "UserId";
    private static final String PROPERTY_NAME_LOCATION_ID = "LocationId";
    private static final String PROPERTY_NAME_LOCATION_LATITUDE = "LocationLatitude";
    private static final String PROPERTY_NAME_LOCATION_LONGITUDE = "LocationLongitude";
    private static final String PROPERTY_NAME_CREATION_TIME = "CreationTime";
    private static final String PROPERTY_NAME_DESCRIPTION_TEXT = "DescriptionText";
    private static final String PROPERTY_NAME_TAGS = "Tags";
    private static final String PROPERTY_NAME_LIKED_USER_IDS = "LikedUserIds";

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
        if (post == null)
            return;

        Entity entity = new Entity(ENTITY_KIND, post.getId().toString());
        entity.setProperty(PROPERTY_NAME_USER_ID, post.getAuthor().getId());
        if (post.getLocation() != null) {
            entity.setProperty(PROPERTY_NAME_LOCATION_ID, post.getLocation().getPlaceId());
            entity.setProperty(PROPERTY_NAME_LOCATION_LATITUDE, post.getLocation().getLatitude());
            entity.setProperty(PROPERTY_NAME_LOCATION_LONGITUDE, post.getLocation().getLongitude());
        }
        entity.setProperty(PROPERTY_NAME_CREATION_TIME, post.getCreationTime());
        entity.setProperty(PROPERTY_NAME_DESCRIPTION_TEXT, post.getDescriptionText());
        entity.setProperty(PROPERTY_NAME_TAGS, getIdsFromTags(post.getTags()));
        entity.setProperty(PROPERTY_NAME_LIKED_USER_IDS, post.getLikedUserIds());
        datastore.put(entity);

        postImageDao.storePostImages(post.getPostImages());
        tagDao.storeTags(post.getTags());
    }

    public Post getPost(UUID id) {
        if (id == null)
            return null;
        Key key = KeyFactory.createKey(ENTITY_KIND, id.toString());
        Entity entity = null;
        try {
            entity = datastore.get(key);
        } catch (EntityNotFoundException e) {
            return null;
        }
        return getPostFromEntity(entity);
    }

    public List<Post> getPosts(long maxCreationTime, int limit) {
        Filter maxCreationTimeFilter = new Query.FilterPredicate(PROPERTY_NAME_CREATION_TIME,
                FilterOperator.LESS_THAN_OR_EQUAL, maxCreationTime);
        Query query = new Query(ENTITY_KIND).setFilter(maxCreationTimeFilter).addSort(PROPERTY_NAME_CREATION_TIME,
                SortDirection.DESCENDING);

        PreparedQuery result = datastore.prepare(query);
        FetchOptions options = FetchOptions.Builder.withLimit(limit);
        List<Post> posts = new ArrayList<>();
        for (Entity entity : result.asIterable(options)) {
            Post post = getPostFromEntity(entity);
            if (post != null)
                posts.add(post);
        }
        return posts;
    }

    public List<Post> getPosts(Location southWest, Location northEast, long maxCreationTime, int limit) {
        if (southWest == null || northEast == null)
            return new ArrayList<>();

        Filter maxCreationTimeFilter = new Query.FilterPredicate(PROPERTY_NAME_CREATION_TIME,
                FilterOperator.LESS_THAN_OR_EQUAL, maxCreationTime);
        Filter swLatFilter = new Query.FilterPredicate(PROPERTY_NAME_LOCATION_LATITUDE,
                FilterOperator.GREATER_THAN_OR_EQUAL, southWest.getLatitude());
        Filter swLngFilter = new Query.FilterPredicate(PROPERTY_NAME_LOCATION_LONGITUDE,
                FilterOperator.GREATER_THAN_OR_EQUAL, southWest.getLongitude());
        Filter neLatFilter = new Query.FilterPredicate(PROPERTY_NAME_LOCATION_LATITUDE,
                FilterOperator.LESS_THAN_OR_EQUAL, southWest.getLatitude());
        Filter neLngFilter = new Query.FilterPredicate(PROPERTY_NAME_LOCATION_LONGITUDE,
                FilterOperator.LESS_THAN_OR_EQUAL, southWest.getLongitude());
        Query query = new Query(ENTITY_KIND).setFilter(
                CompositeFilterOperator.and(maxCreationTimeFilter, swLatFilter, swLngFilter, neLatFilter, neLngFilter))
                .addSort(PROPERTY_NAME_CREATION_TIME, SortDirection.DESCENDING);

        PreparedQuery result = datastore.prepare(query);
        FetchOptions options = FetchOptions.Builder.withLimit(limit);
        List<Post> posts = new ArrayList<>();
        for (Entity entity : result.asIterable(options)) {
            Post post = getPostFromEntity(entity);
            if (post != null)
                posts.add(post);
        }
        return posts;
    }

    public List<Post> getPosts(String userId, long maxCreationTime, int limit) {
        if (userId == null)
            return new ArrayList<>();

        Filter maxCreationTimeFilter = new Query.FilterPredicate(PROPERTY_NAME_CREATION_TIME,
                FilterOperator.LESS_THAN_OR_EQUAL, maxCreationTime);
        Filter userIdFiler = new Query.FilterPredicate(PROPERTY_NAME_USER_ID, FilterOperator.EQUAL, userId);
        Query query = new Query(ENTITY_KIND).setFilter(CompositeFilterOperator.and(maxCreationTimeFilter, userIdFiler))
                .addSort(PROPERTY_NAME_CREATION_TIME, SortDirection.DESCENDING);

        PreparedQuery result = datastore.prepare(query);
        FetchOptions options = FetchOptions.Builder.withLimit(limit);
        List<Post> posts = new ArrayList<>();
        for (Entity entity : result.asIterable(options)) {
            Post post = getPostFromEntity(entity);
            if (post != null)
                posts.add(post);
        }
        return posts;
    }

    public List<Post> getPosts(UUID tagId, long maxCreationTime, int limit) {
        if (tagId == null)
            return new ArrayList<>();
        Filter maxCreationTimeFilter = new Query.FilterPredicate(PROPERTY_NAME_CREATION_TIME,
                FilterOperator.LESS_THAN_OR_EQUAL, maxCreationTime);
        Filter tagFilter = new Query.FilterPredicate(PROPERTY_NAME_TAGS, FilterOperator.IN, tagId);

        Query query = new Query(ENTITY_KIND).setFilter(CompositeFilterOperator.and(maxCreationTimeFilter, tagFilter))
                .addSort(PROPERTY_NAME_CREATION_TIME, SortDirection.DESCENDING);
        PreparedQuery result = datastore.prepare(query);
        FetchOptions options = FetchOptions.Builder.withLimit(limit);
        List<Post> posts = new ArrayList<>();
        for (Entity entity : result.asIterable(options)) {
            Post post = getPostFromEntity(entity);
            if (post != null)
                posts.add(post);
        }
        return posts;
    }

    public void deletePost(UUID postId) {
        if (postId == null)
            return;
        Key key = KeyFactory.createKey(ENTITY_KIND, postId.toString());
        datastore.delete(key);
    }

    public void likePost(UUID id, String userId) {
        if (userId == null)
            return;
        Post post = getPost(id);
        if (post == null)
            return;
        if (post.getLikedUserIds().contains(userId))
            return;
        post.getLikedUserIds().add(userId);
        storePost(post);
    }

    public void unlikePost(UUID id, String userId) {
        if (userId == null)
            return;
        Post post = getPost(id);
        if (post == null)
            return;
        if (!post.getLikedUserIds().contains(userId))
            return;
        post.getLikedUserIds().remove(userId);
        storePost(post);
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

    private Post getPostFromEntity(Entity entity) {
        if (entity == null)
            return null;
        try {
            String idString = entity.getKey().getName();
            UUID id = UUID.fromString(idString);

            String userId = (String) entity.getProperty(PROPERTY_NAME_USER_ID);
            User author = userDao.getUser(userId);

            Location location = null;
            if (entity.hasProperty(PROPERTY_NAME_LOCATION_ID)) {
                String locationId = (String) entity.getProperty(PROPERTY_NAME_LOCATION_ID);
                double latitude = (double) entity.getProperty(PROPERTY_NAME_LOCATION_LATITUDE);
                double longitude = (double) entity.getProperty(PROPERTY_NAME_LOCATION_LONGITUDE);
                location = new Location(locationId, latitude, longitude);
            }

            long creationTime = (long) entity.getProperty(PROPERTY_NAME_CREATION_TIME);
            String descriptionText = (String) entity.getProperty(PROPERTY_NAME_DESCRIPTION_TEXT);

            List<PostImage> postImages = postImageDao.getPostImages(id);

            @SuppressWarnings("unchecked")
            List<String> tagIds = (List<String>) entity.getProperty(PROPERTY_NAME_TAGS);
            if (tagIds == null)
                tagIds = new ArrayList<>();
            List<Tag> tags = getTagsFromIds(tagIds);

            @SuppressWarnings("unchecked")
            List<String> likedUserIds = (List<String>) entity.getProperty(PROPERTY_NAME_LIKED_USER_IDS);
            if (likedUserIds == null)
                likedUserIds = new ArrayList<>();

            Post post = new Post(id, author, location, creationTime, descriptionText, postImages, tags, likedUserIds);
            return post;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}