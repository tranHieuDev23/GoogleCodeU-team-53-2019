package com.google.codeu.models;

import java.net.URL;
import java.util.Date;

/**
 * The class representing a user
 */
public class User {

    private String id;
    private String username;
    private Date birthdate;
    private String bioText;
    private URL avatarUrl;

    /**
     * Constructing a new <code>User</code> object with an ID and a username. Used
     * when the user log in for the first time, and the only information we have are
     * ID and email address.
     * 
     * @param id        The user ID string. When using with AppEngine
     *                  <code>UserService</code>, this value corresponds to the one
     *                  returned by <code>User.getUserId()</code>.
     * @param username  The user's username. When using with AppEngine
     *                  <code>UserService</code>, this value corresponds to the one
     *                  returned by <code>User.getEmail()</code>.
     * @param avatarUrl The URL to the user's avatar.
     */
    public User(String id, String username, URL avatarUrl) {
        this(id, username, null, "", avatarUrl);
    }

    /**
     * Constructing a new <code>User</code> object in full details.
     * 
     * @param id        The user ID string. When using with AppEngine
     *                  <code>UserService</code>, this value corresponds to the one
     *                  returned by <code>User.getUserId()</code>.
     * @param username  The user's username. When using with AppEngine
     *                  <code>UserService</code>, this value corresponds to the one
     *                  returned by <code>User.getEmail()</code>.
     * @param birthdate The user's birthdate.
     * @param bioText   The user's bio text, or an empty string if there is none.
     * @param avatarUrl The URL to the user's avatar.
     */
    public User(String id, String username, Date birthdate, String bioText, URL avatarUrl) {
        this.id = id;
        this.username = username;
        this.birthdate = birthdate;
        this.bioText = bioText;
        this.avatarUrl = avatarUrl;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public String getBioText() {
        return bioText;
    }

    public URL getAvatarUrl() {
        return avatarUrl;
    }
}