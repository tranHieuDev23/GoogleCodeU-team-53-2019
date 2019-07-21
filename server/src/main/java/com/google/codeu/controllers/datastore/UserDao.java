package com.google.codeu.controllers.datastore;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.codeu.models.User;
import java.util.Date;

public class UserDao {

  private static final String ENTITY_KIND = "User";
  private static final String PROPERTY_NAME_ID = "UserId";
  private static final String PROPERTY_NAME_USERNAME = "Username";
  private static final String PROPERTY_NAME_BIRTHDATE = "Birthdate";
  private static final String PROPERTY_NAME_BIO_TEXT = "BioText";
  private static final String PROPERTY_NAME_AVATAR = "Avatar";

  private DatastoreService datastore;

  public UserDao() {
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  public void storeUser(User user) {
    if (user == null)
      return;

    Entity userEntity = new Entity(ENTITY_KIND);
    userEntity.setProperty(PROPERTY_NAME_ID, user.getId());
    userEntity.setProperty(PROPERTY_NAME_USERNAME, user.getUsername());
    userEntity.setProperty(PROPERTY_NAME_BIRTHDATE, user.getBirthdate());
    userEntity.setProperty(PROPERTY_NAME_BIO_TEXT, user.getBioText());
    userEntity.setProperty(PROPERTY_NAME_AVATAR, user.getAvatarUrl().toString());
    datastore.put(userEntity);
  }

  public User getUser(String id) {
    if (id == null)
      return null;

    Query query = new Query(ENTITY_KIND)
        .setFilter(new Query.FilterPredicate(PROPERTY_NAME_ID, FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);
    Entity userEntity = results.asSingleEntity();
    if (userEntity == null)
      return null;
    String username = (String) userEntity.getProperty(PROPERTY_NAME_USERNAME);
    Date birthdate = (Date) userEntity.getProperty(PROPERTY_NAME_BIRTHDATE);
    String bioText = (String) userEntity.getProperty(PROPERTY_NAME_BIO_TEXT);
    Link avatarUrl = new Link((String) userEntity.getProperty(PROPERTY_NAME_AVATAR));
    User user = new User(id, username, birthdate, bioText, avatarUrl);
    return user;
  }

  public void updateUser(User user) {
    if (user == null)
      return;

    Query query = new Query(ENTITY_KIND)
        .setFilter(new Query.FilterPredicate(PROPERTY_NAME_ID, FilterOperator.EQUAL, user.getId()));
    PreparedQuery results = datastore.prepare(query);
    Entity userEntity = results.asSingleEntity();
    if (userEntity == null)
      return;
    userEntity.setProperty(PROPERTY_NAME_USERNAME, user.getUsername());
    userEntity.setProperty(PROPERTY_NAME_BIRTHDATE, user.getBirthdate());
    userEntity.setProperty(PROPERTY_NAME_BIO_TEXT, user.getBioText());
    userEntity.setProperty(PROPERTY_NAME_AVATAR, user.getAvatarUrl().toString());
    datastore.put(userEntity);
  }
}
