package com.google.codeu.models;

import java.util.UUID;

/** Class representing a comment in a post. */
public class Comment {

  private UUID id;
  private String authorId;
  private UUID postId;
  private long creationTime;
  private String text;

  /**
   * Construct a new <code>Comment</code> object with the author and the commented post's ID and the
   * comment's content. This method is to be used when creating a new comment to save into the
   * database, in which case:
   *
   * <ul>
   *   <li>The ID will be generated randomly by the server.
   *   <li>The creation time will be the server's current time.
   * </ul>
   *
   * @param authorId The author's ID.
   * @param postId The commented post's ID.
   * @param text The comment's content.
   */
  public Comment(String authorId, UUID postId, String text) {
    this(UUID.randomUUID(), authorId, postId, System.currentTimeMillis(), text);
  }

  /**
   * Construct a new <code>Comment</code> object in full details. This method is to be used when
   * retrieving a comment from the database.
   *
   * @param id The comment's ID.
   * @param authorId The author's ID.
   * @param postId The commented post's ID.
   * @param creationTime The comment's creation time.
   * @param text The comment's content.
   */
  public Comment(UUID id, String authorId, UUID postId, long creationTime, String text) {
    this.id = id;
    this.authorId = authorId;
    this.postId = postId;
    this.creationTime = creationTime;
    this.text = text;
  }

  public UUID getId() {
    return id;
  }

  public String getAuthorId() {
    return authorId;
  }

  public UUID getPostId() {
    return postId;
  }

  public long getCreationTime() {
    return creationTime;
  }

  public String getText() {
    return text;
  }
}
