package com.google.codeu.models;

import java.util.UUID;
import org.apache.commons.lang3.StringUtils;

/** Class representing a tag in a post. */
public class Tag {

  private UUID id;
  private String tagName;

  /**
   * Constructing a new <code>Tag</code> object with a tag name.
   *
   * @param tagName The tag's non-spaced name.
   * @throws IllegalArgumentException Throws if <code>tagName</code> contains whitespace.
   */
  public Tag(String tagName) throws IllegalArgumentException {
    this(UUID.randomUUID(), tagName);
  }

  /**
   * Constructing a new <code>Tag</code> object in full details.
   *
   * @param id The tag's id.
   * @param tagName The tag's non-spaced name.
   * @throws IllegalArgumentException Throws if <code>tagName</code> contains whitespace.
   */
  public Tag(UUID id, String tagName) throws IllegalArgumentException {
    if (StringUtils.containsWhitespace(tagName))
      throw new IllegalArgumentException("tagName cannot contain whitespace!");
    this.id = id;
    this.tagName = tagName;
  }

  public UUID getId() {
    return id;
  }

  public String getTagName() {
    return tagName;
  }
}
