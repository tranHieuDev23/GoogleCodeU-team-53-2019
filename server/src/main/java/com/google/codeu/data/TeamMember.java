package com.google.codeu.data;

/** Information about a single team member */
public class TeamMember {

  private String name;
  private String summerFeelz;
  private String aspirationalHobby;
  private String askMeAbout;

  /**
   * Constructs a new {@link TeamMember} with the provided information.
   *
   * @param name Team member's name
   * @param summerFeelz Team member's Summer Feelz content
   * @param aspirationalHobby Team member's Aspirational Hobby content
   * @param askMeAbout Team member's Ask Me About content
   */
  public TeamMember(String name, String summerFeelz, String aspirationalHobby, String askMeAbout) {
    this.name = name;
    this.summerFeelz = summerFeelz;
    this.aspirationalHobby = aspirationalHobby;
    this.askMeAbout = askMeAbout;
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
