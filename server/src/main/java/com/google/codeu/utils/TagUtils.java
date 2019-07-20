package com.google.codeu.utils;

import java.text.Normalizer;

public class TagUtils {
    private TagUtils() {}

    public static String slugify(String s) {
        s = removeAccents(s);
        s = makeUrlSafe(s);
        return s;
    }

    private static String removeAccents(String s) {
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        s = s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        return s;
    }

    private static String makeUrlSafe(String s) {
        s = s.replaceAll("[^a-zA-z0-9\\s-]", "");
        s = s.replaceAll("\\s+", "  ").trim();
        s = s.replaceAll("\\s+", "_");
        return s;
    }
}