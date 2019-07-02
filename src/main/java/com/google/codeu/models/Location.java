package com.google.codeu.models;

/**
 * <p>
 * Class representing a location in a post.
 * </p>
 * 
 * <p>
 * Although for now the class only consists of a single value
 * <code>placeId</code> (which can be used to trace back location's original
 * latitude, longitude and name), it is still written separately in case latter
 * features require extra implementation.
 * </p>
 */
public class Location {

    private String placeId;

    /**
     * Construct a new <code>Location</code> object.
     * 
     * @param placeId The location's
     *                <a href='https://developers.google.com/places/place-id'>Place
     *                Id</a> on Google Maps.
     */
    public Location(String placeId) {
        this.placeId = placeId;
    }

    public String getPlaceId() {
        return placeId;
    }
}