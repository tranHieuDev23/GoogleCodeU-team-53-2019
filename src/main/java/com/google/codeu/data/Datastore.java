/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Provides access to the data stored in Datastore. */
public class Datastore {

    private DatastoreService datastore;

    public Datastore() {
        datastore = DatastoreServiceFactory.getDatastoreService();
    }

    /** Stores the Message in Datastore. */
    public void storeMessage(Message message) {
        Entity messageEntity = new Entity("Message", message.getId().toString());
        messageEntity.setProperty("user", message.getUser());
        messageEntity.setProperty("text", message.getText());
        messageEntity.setProperty("timestamp", message.getTimestamp());

        datastore.put(messageEntity);
    }

    /**
     * Gets messages posted by a specific user.
     *
     * @return a list of messages posted by the user, or empty list if user has
     *         never posted a message. List is sorted by time descending.
     */
    public List<Message> getMessages(String user) {
        List<Message> messages = new ArrayList<>();

        Query query = new Query("Message").setFilter(new Query.FilterPredicate("user", FilterOperator.EQUAL, user))
                .addSort("timestamp", SortDirection.DESCENDING);
        PreparedQuery results = datastore.prepare(query);

        for (Entity entity : results.asIterable()) {
            try {
                String idString = entity.getKey().getName();
                UUID id = UUID.fromString(idString);
                String text = (String) entity.getProperty("text");
                long timestamp = (long) entity.getProperty("timestamp");

                Message message = new Message(id, user, text, timestamp);
                messages.add(message);
            } catch (Exception e) {
                System.err.println("Error reading message.");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }

        return messages;
    }

    /**
     * Gets every messages posted by all user.
     * 
     * @return a list of messages posted by the user, or empty list if user has
     *         never posted a message. List is sorted by time descending.
     */
    public List<Message> getAllMessage() {
        List<Message> messages = new ArrayList<>();

        Query query = new Query("Message").addSort("timestamp", SortDirection.DESCENDING);
        PreparedQuery results = datastore.prepare(query);

        for (Entity entity : results.asIterable()) {
            try {
                String idString = entity.getKey().getName();
                UUID id = UUID.fromString(idString);
                String user = (String) entity.getProperty("user");
                String text = (String) entity.getProperty("text");
                long timestamp = (long) entity.getProperty("timestamp");

                Message message = new Message(id, user, text, timestamp);
                messages.add(message);
            } catch (Exception e) {
                System.err.println("Error loading message.");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }
        return messages;
    }

    /**
     * Get information about every team member
     * 
     * @return a list of team member information, or empty list if there is no data.
     *         List is sorted by order of appearance, which is for now according to
     *         a Date/Time property named "Timestamp".
     */
    public List<TeamMember> getAllTeamMember() {
        List<TeamMember> members = new ArrayList<>();

        Query query = new Query("Team Member").addSort("Timestamp", SortDirection.ASCENDING);
        PreparedQuery results = datastore.prepare(query);

        for (Entity entity : results.asIterable()) {
            try {
                String name = (String) entity.getProperty("Name");
                String summerFeelz = (String) entity.getProperty("Summer Feelz");
                String aspirationalHobby = (String) entity.getProperty("Aspirational Hobby");
                String askMeAbout = (String) entity.getProperty("Ask me About");

                TeamMember member = new TeamMember(name, summerFeelz, aspirationalHobby, askMeAbout);
                members.add(member);
            } catch (Exception e) {
                System.err.println("Error loading team member's information!");
                System.err.println(entity.toString());
                e.printStackTrace();
            }
        }

        return members;
    }
}
