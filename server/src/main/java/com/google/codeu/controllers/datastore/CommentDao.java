package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.*;
import com.google.codeu.models.*;

public class CommentDao {

    private static final String ENTITY_KIND = "Comment";
    private static final String PROPERTY_NAME_USER_ID = "UserId";
    private static final String PROPERTY_NAME_POST_ID = "PostId";
    private static final String PROPERTY_NAME_COMMENT_TEXT = "CommentText";
    private static final String PROPERTY_NAME_CREATION_TIME = "CreationTime";

    private DatastoreService datastore;

    public CommentDao() {
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

    public void storeComment(Comment comment) {
        Entity entity = new Entity(ENTITY_KIND, comment.getId().toString());
        entity.setProperty(PROPERTY_NAME_USER_ID, comment.getAuthorId());
        entity.setProperty(PROPERTY_NAME_POST_ID, comment.getPostId().toString());
        entity.setProperty(PROPERTY_NAME_COMMENT_TEXT, comment.getText());
        entity.setProperty(PROPERTY_NAME_CREATION_TIME, comment.getCreationTime());
        datastore.put(entity);
    }

    public Comment getComment(UUID commentId) {
        Query query = new Query(ENTITY_KIND)
                .setFilter(new Query.FilterPredicate("__key__", FilterOperator.EQUAL, commentId.toString()))
                .addSort(PROPERTY_NAME_CREATION_TIME, SortDirection.ASCENDING);
        PreparedQuery result = datastore.prepare(query);
        Entity entity = result.asSingleEntity();
        if (entity == null)
            return null;

        String userId = (String) entity.getProperty(PROPERTY_NAME_USER_ID);
        UUID postId = UUID.fromString((String) entity.getProperty(PROPERTY_NAME_USER_ID));
        String commentText = (String) entity.getProperty(PROPERTY_NAME_COMMENT_TEXT);
        long creationTime = (long) entity.getProperty(PROPERTY_NAME_CREATION_TIME);
        Comment comment = new Comment(commentId, userId, postId, creationTime, commentText);

        return comment;
    }

    public List<Comment> getComments(UUID postId) {
        Query query = new Query(ENTITY_KIND)
                .setFilter(new Query.FilterPredicate(PROPERTY_NAME_POST_ID, FilterOperator.EQUAL, postId.toString()))
                .addSort(PROPERTY_NAME_CREATION_TIME, SortDirection.ASCENDING);
        PreparedQuery result = datastore.prepare(query);
        List<Comment> comments = new ArrayList<>();
        for (Entity entity : result.asIterable()) {
            try {
                String idString = entity.getKey().getName();
                UUID id = UUID.fromString(idString);
                String userId = (String) entity.getProperty(PROPERTY_NAME_USER_ID);
                String commentText = (String) entity.getProperty(PROPERTY_NAME_COMMENT_TEXT);
                long creationTime = (long) entity.getProperty(PROPERTY_NAME_CREATION_TIME);
                Comment comment = new Comment(id, userId, postId, creationTime, commentText);
                comments.add(comment);
            } catch (Exception e) {
                System.err.println("Error reading comment.");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }
        return comments;
    }

    public void deleteComment(UUID id) {
        Key key = KeyFactory.createKey(ENTITY_KIND, id.toString());
        datastore.delete(key);
    }
}