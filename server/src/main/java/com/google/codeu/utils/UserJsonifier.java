package com.google.codeu.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import com.google.codeu.models.User;

import org.json.JSONObject;

public class UserJsonifier {
    private UserJsonifier() {}

    public static JSONObject jsonify(User user) {
        JSONObject object = new JSONObject(user);
        if (user.getBirthdate() != null) {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            object.put("birthdate", dateFormat.format(user.getBirthdate()));
        }
        return object;
    }
}