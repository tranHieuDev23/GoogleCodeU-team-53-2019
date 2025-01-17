package com.google.codeu.controllers.servlets;

import com.google.codeu.controllers.visionapi.VisionAPIHelper;
import com.google.codeu.utils.ServletLink;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet(ServletLink.API_PREDICT_TAG)
@MultipartConfig
public class PredictTagsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private VisionAPIHelper visionHelper;

    @Override
    public void init() throws ServletException {
        visionHelper = VisionAPIHelper.getInstance();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");

        List<String> result = null;
        try {
            result = getPredTagsFromReq(req);
        } catch (Exception e) {
            System.out.println("Error while creating new Tags!");
            e.printStackTrace();
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        JSONObject response = new JSONObject();
        response.put("tags", new JSONArray(result));
        res.getWriter().println(response);
    }

    private List<String> getPredTagsFromReq(HttpServletRequest req) throws Exception {
        int limit = 5; // maximum number of tags to return

        int imageCount = Integer.parseInt(req.getParameter("numberOfImages"));

        // numberOfImages
        List<InputStream> imageStreams = new ArrayList<>();

        // file-0, file-1 etc format from client request
        for (int i = 0; i < imageCount; i++) {
            try {
                Part filePart = req.getPart("file-" + i);
                InputStream fileContent = filePart.getInputStream();
                imageStreams.add(fileContent);
            } catch (Exception e) {
                System.out.println("Error happens while handling image files!");
                e.printStackTrace();
            }
        }

        /** Call vision API Helper to predict tags on images */
        List<String> PredictedTags = visionHelper.predictTags(imageStreams, limit);

        return PredictedTags;
    }
}
