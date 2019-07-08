package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.*;
import com.google.codeu.models.*;

public class NotificationDao {

    private static final String ENTITY_KIND = "Notification";
    private static final String PROPERTY_NAME_USER_ID = "UserId";
    private static final String PROPERTY_NAME_CREATION_TIME = "CreationTime";
    private static final String PROPERTY_NAME_NOTIFICATION_TEXT = "NotificationText";
    private static final String PROPERTY_NAME_ICON_URL = "IconURL";
    private static final String PROPERTY_NAME_TARGET_URL = "TargetURL";

    private DatastoreService datastore;

    public NotificationDao() {
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

    public void storeNotification(Notification notification) {
        Entity entity = new Entity(ENTITY_KIND, notification.getId().toString());
        entity.setProperty(PROPERTY_NAME_USER_ID, notification.getUserId());
        entity.setProperty(PROPERTY_NAME_CREATION_TIME, notification.getCreationTime());
        entity.setProperty(PROPERTY_NAME_NOTIFICATION_TEXT, notification.getNotificationText());
        entity.setProperty(PROPERTY_NAME_ICON_URL, notification.getIconUrl());
        entity.setProperty(PROPERTY_NAME_TARGET_URL, notification.getTargetUrl());
        datastore.put(entity);
    }

    public List<Notification> getNotifications(String userId, long maxCreationTime, int limit) {
        Filter userFilter = new Query.FilterPredicate(PROPERTY_NAME_USER_ID, FilterOperator.EQUAL, userId);
        Filter timeFilter = new Query.FilterPredicate(PROPERTY_NAME_CREATION_TIME, FilterOperator.LESS_THAN_OR_EQUAL,
                maxCreationTime);
        Query query = new Query(ENTITY_KIND).setFilter(CompositeFilterOperator.and(userFilter, timeFilter))
                .addSort(PROPERTY_NAME_CREATION_TIME, SortDirection.DESCENDING);

        PreparedQuery result = datastore.prepare(query);
        FetchOptions options = FetchOptions.Builder.withLimit(limit);
        List<Notification> notifications = new ArrayList<>();
        for (Entity entity : result.asIterable(options)) {
            try {
                String idString = (String) entity.getKey().getName();
                UUID id = UUID.fromString(idString);
                long creationTime = (long) entity.getProperty(PROPERTY_NAME_CREATION_TIME);
                String notificationText = (String) entity.getProperty(PROPERTY_NAME_NOTIFICATION_TEXT);
                Link iconUrl = new Link((String) entity.getProperty(PROPERTY_NAME_ICON_URL));
                Link targetUrl = new Link((String) entity.getProperty(PROPERTY_NAME_TARGET_URL));

                Notification notification = new Notification(id, userId, creationTime, notificationText, iconUrl,
                        targetUrl);
                notifications.add(notification);
            } catch (Exception e) {
                System.err.println("Error reading notification.");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }
        return notifications;
    }
}