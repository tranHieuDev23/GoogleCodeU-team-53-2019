package com.google.codeu.controllers.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.codeu.models.Tag;

public class TagDao {

    private static final String ENTITY_KIND = "Tag";
    private static final String PROPERTY_NAME_TAG_NAME = "TagName";

    private DatastoreService datastore;

    public TagDao() {
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

    public void storeTags(List<Tag> tags) {
        if (tags == null)
            return;

        List<Entity> entities = new ArrayList<Entity>();
        for (Tag tag : tags) {
            Entity entity = new Entity(ENTITY_KIND, tag.getId().toString());
            entity.setProperty(PROPERTY_NAME_TAG_NAME, tag.getTagName());
            entities.add(entity);
        }
        datastore.put(entities);
    }

    public Tag getTag(UUID id) {
        if (id == null)
            return null;

        Query query = new Query(ENTITY_KIND)
                .setFilter(new Query.FilterPredicate("__key__", FilterOperator.EQUAL, id.toString()));
        PreparedQuery result = datastore.prepare(query);
        Entity entity = result.asSingleEntity();
        if (entity == null)
            return null;
        String tagName = (String) entity.getProperty(PROPERTY_NAME_TAG_NAME);
        Tag tag = new Tag(id, tagName);
        return tag;
    }

    public Tag getTag(String tagName) {
        if (tagName == null)
            return null;
            
        Query query = new Query(ENTITY_KIND)
                .setFilter(new Query.FilterPredicate(PROPERTY_NAME_TAG_NAME, FilterOperator.EQUAL, tagName));
        PreparedQuery result = datastore.prepare(query);
        Entity entity = result.asSingleEntity();
        if (entity == null)
            return null;
        String idString = (String) entity.getKey().getName();
        UUID id = UUID.fromString(idString);
        Tag tag = new Tag(id, tagName);
        return tag;
    }
}