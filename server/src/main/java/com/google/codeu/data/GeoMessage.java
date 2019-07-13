package com.google.codeu.data;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** A message posted by a user, with information about the location of the poster. */
public class GeoMessage {

  private static DatastoreService datastoreService;

  private UUID id;
  private String user;
  private String text;
  private long timestamp;
  private double latitude, longitude;

  /**
   * Constructs a new {@link GeoMessage} posted by {@code user}, located at coordinate {@code
   * latitude, longitude} with {@code text} content. Generates a random ID and uses the current
   * system time for the creation time.
   */
  public GeoMessage(String user, double latitude, double longitude, String text) {
    this(UUID.randomUUID(), user, latitude, longitude, text, System.currentTimeMillis());
  }

  public GeoMessage(
      UUID id, String user, double latitude, double longitude, String text, long timestamp) {
    this.id = id;
    this.user = user;
    this.text = text;
    this.timestamp = timestamp;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public UUID getId() {
    return id;
  }

  public String getUser() {
    return user;
  }

  public String getText() {
    return text;
  }

  public long getTimestamp() {
    return timestamp;
  }

  public double getLatitude() {
    return latitude;
  }

  public double getLongitude() {
    return longitude;
  }

  public static void storeGeoMessage(GeoMessage message) {
    Entity messageEntity = new Entity("GeoMessage", message.getId().toString());
    messageEntity.setProperty("user", message.getUser());
    messageEntity.setProperty("latitude", message.getLatitude());
    messageEntity.setProperty("longitude", message.getLongitude());
    messageEntity.setProperty("text", message.getText());
    messageEntity.setProperty("timestamp", message.getTimestamp());

    getDatastoreService().put(messageEntity);
  }

  public static List<GeoMessage> getGeoMessages() {
    List<GeoMessage> result = new ArrayList<>();

    Query query = new Query("GeoMessage").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery preparedQuery = getDatastoreService().prepare(query);

    for (Entity entity : preparedQuery.asIterable()) {
      try {
        String idString = entity.getKey().getName();
        UUID uuid = UUID.fromString(idString);
        String user = (String) entity.getProperty("user");
        double latitude = (double) entity.getProperty("latitude");
        double longitude = (double) entity.getProperty("longitude");
        String text = (String) entity.getProperty("text");
        long timestamp = (long) entity.getProperty("timestamp");

        result.add(new GeoMessage(uuid, user, latitude, longitude, text, timestamp));
      } catch (Exception e) {
        System.err.println("Error reading GeoMessage.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }

    return result;
  }

  private static DatastoreService getDatastoreService() {
    if (datastoreService == null) datastoreService = DatastoreServiceFactory.getDatastoreService();
    return datastoreService;
  }
}
