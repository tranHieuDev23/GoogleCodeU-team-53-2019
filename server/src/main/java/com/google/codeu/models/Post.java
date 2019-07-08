package com.google.codeu.models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Post {

    private UUID id;
    private User author;
    private Location location;
    private long creationTime;
    private String descriptionText;
    private List<PostImage> postImages;
    private List<Tag> tags;
    private List<String> likedUserIds;

    /**
     * Construct a new <code>Post</code> object without ID, creation time and list
     * of liked users. This method is to be used when creating a new post to save
     * into the database, in which case:
     * <ul>
     * <li>The ID will be generated randomly by the server.</li>
     * <li>The creation time will be the server's current time.</li>
     * <li>The list of liked users will be initialized as an empty list.</li>
     * </ul>
     * 
     * @param author          The user who created this post.
     * @param location        The location of this post.
     * @param descriptionText The post's description text.
     * @param postImages      The list of images associated with this post.
     * @param tags            The list of tags this post has.
     */
    public Post(User author, Location location, String descriptionText, List<PostImage> postImages, List<Tag> tags) {
        this(UUID.randomUUID(), author, location, System.currentTimeMillis(), descriptionText, postImages, tags,
                new ArrayList<>());
    }

    /**
     * Construct a new <code>Post</code object in full details. This method is to be
     * used when retrieving a post from the database.
     * 
     * @param id              The post's ID.
     * @param author          The user who created this post.
     * @param location        The location of this post.
     * @param creationTime    The time this post was created.
     * @param descriptionText The post's description text.
     * @param postImages      The list of images associated with this post.
     * @param tags            The list of tags this post has.
     * @param likedUserIds      The list of users who liked this post.
     */
    public Post(UUID id, User author, Location location, long creationTime, String descriptionText,
            List<PostImage> postImages, List<Tag> tags, List<String> likedUserIds) {
        this.id = id;
        this.author = author;
        this.location = location;
        this.creationTime = creationTime;
        this.descriptionText = descriptionText;
        this.postImages = postImages;
        this.tags = tags;
        this.likedUserIds = likedUserIds;
    }

    public UUID getId() {
        return id;
    }

    public User getAuthor() {
        return author;
    }

    public Location getLocation() {
        return location;
    }

    public long getCreationTime() {
        return creationTime;
    }

    public String getDescriptionText() {
        return descriptionText;
    }

    public List<PostImage> getPostImages() {
        return postImages;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<String> getLikedUserIds() {
        return likedUserIds;
    }

    public List<Comment> getComments() {
        List<Comment> result = new ArrayList<>();
        // TODO: Return comments here
        return result;
    }
}