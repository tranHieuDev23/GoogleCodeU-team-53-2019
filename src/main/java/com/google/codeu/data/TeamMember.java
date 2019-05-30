package com.google.codeu.data;

import java.util.UUID;

/** Information about a single team member */
public class TeamMember {

    private UUID id;
    private String name;
    private String summerFeelz;
    private String aspirationalHobby;
    private String askMeAbout;

    /***
     * Constructs a new {@link TeamMember} with the provided information. Generates
     * a random ID and uses the current system time for the creation time.
     * 
     * @param name              Team member's name
     * @param summerFeelz       Team member's Summer Feelz content
     * @param aspirationalHobby Team member's Aspirational Hobby content
     * @param askMeAbout        Team member's Ask Me About content
     */
    public TeamMember(String name, String summerFeelz, String aspirationalHobby, String askMeAbout) {
        this(UUID.randomUUID(), name, summerFeelz, aspirationalHobby, askMeAbout);
    }

    /**
     * Constructs a new {@link TeamMember} with the provided information and a
     * specific ID.
     * 
     * @param id                The Entity's ID.
     * @param name              Team member's name
     * @param summerFeelz       Team member's Summer Feelz content
     * @param aspirationalHobby Team member's Aspirational Hobby content
     * @param askMeAbout        Team member's Ask Me About content
     */
    public TeamMember(UUID id, String name, String summerFeelz, String aspirationalHobby, String askMeAbout) {
        this.id = id;
        this.name = name;
        this.summerFeelz = summerFeelz;
        this.aspirationalHobby = aspirationalHobby;
        this.askMeAbout = askMeAbout;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSummerFeelz() {
        return summerFeelz;
    }

    public String getAspirationalHobby() {
        return aspirationalHobby;
    }

    public String getAskMeAbout() {
        return askMeAbout;
    }
}