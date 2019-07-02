package com.google.codeu.models;

import java.net.URL;
import java.util.UUID;

/**
 * Class representing a user's notification.
 */
public class Notification {

    private UUID id;
    private String userId;
    private long creationTime;
    private String notificationText;
    private URL iconUrl;
    private URL targetUrl;

    /**
     * Construct a new <code>Notification</code> object with the user's ID, the
     * content text, a URL for its icon and a target URL. This method is to be used
     * when creating a new notification to save into the database, in which case:
     * <ul>
     * <li>The ID will be generated randomly by the server.</li>
     * <li>The creation time will be the server's current time.</li>
     * </ul>
     * 
     * @param userId           The user's ID.
     * @param notificationText The notification's content.
     * @param iconUrl          The notification's icon URL.
     * @param targetUrl        The URL the user will be redirected to once they
     *                         clicked on the notification.
     */
    public Notification(String userId, String notificationText, URL iconUrl, URL targetUrl) {
        this(UUID.randomUUID(), userId, System.currentTimeMillis(), notificationText, iconUrl, targetUrl);
    }

    /**
     * Construct a new <code>Notification</code> object in full details. This method
     * is to be used when retrieving a notification from the database.
     * 
     * @param id               The notification's ID.
     * @param userId           The user's ID.
     * @param The              notification's creation time.
     * @param notificationText The notification's content.
     * @param iconUrl          The notification's icon URL.
     * @param targetUrl        The URL the user will be redirected to once they
     *                         clicked on the notification.
     */
    public Notification(UUID id, String userId, long creationTime, String notificationText, URL iconUrl,
            URL targetUrl) {
        this.id = id;
        this.userId = userId;
        this.creationTime = creationTime;
        this.notificationText = notificationText;
        this.iconUrl = iconUrl;
        this.targetUrl = targetUrl;
    }

    public UUID getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public long getCreationTime() {
        return creationTime;
    }

    public String getNotificationText() {
        return notificationText;
    }

    public URL getIconUrl() {
        return iconUrl;
    }

    public URL getTargetUrl() {
        return targetUrl;
    }
}