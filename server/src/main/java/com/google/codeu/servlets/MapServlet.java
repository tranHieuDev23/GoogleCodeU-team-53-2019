package com.google.codeu.servlets;

import java.util.List;
import java.util.Scanner;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.data.*;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

/**
 * Handles fetching all messages for the public feed.
 */
@WebServlet("/map")
public class MapServlet extends HttpServlet {

    private class UfoSighting {
        double lat, lng;
        String description;

        public UfoSighting(double lat, double lng, String description) {
            this.lat = lat;
            this.lng = lng;
            this.description = description;
        }
    }

    private JsonArray ufoSightingsArray;

    @Override
    public void init() {
        this.ufoSightingsArray = new JsonArray();
        Gson gson = new Gson();
        Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/ufo_locations.csv"));
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] data = line.split("\t");

            double lat = Double.parseDouble(data[1]);
            double lng = Double.parseDouble(data[2]);

            UfoSighting sighting = new UfoSighting(lat, lng, data[0]);
            ufoSightingsArray.add(gson.toJsonTree(sighting));
        }
        scanner.close();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType(("application/json"));
        response.setCharacterEncoding("UTF-8");
        String jsonString = ufoSightingsArray.toString();
        response.getWriter().println(jsonString);
    }
}