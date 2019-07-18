package com.google.codeu.controllers.servlets;

//import com.google.codeu.controllers.datastore.TagDao;
import com.google.codeu.controllers.visionapi.VisionAPIHelper;
import com.google.codeu.utils.ServletLink;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet(ServletLink.API_PREDICT_TAG)
public class PredictTagsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    //private TagDao tagDao;
    private VisionAPIHelper visionHelper;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        //tagDao = new TagDao();
        visionHelper = VisionAPIHelper.getInstance();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json");
        int limit = 5; // maximum number of tags to return
        //UUID postId = imageDao.getPostId;
       /**
        String postDetailsJson = req.getParameter("postDetails");
        if (postDetailsJson == null)
            return null;
        JSONObject postDetails = new JSONObject(postDetailsJson);

        JSONArray imageDescriptions = postDetails.getJSONArray("imageDescriptions");
        int imageCount = imageDescriptions.length();
        */
        List<InputStream> imageStreams = new ArrayList<>();
        
        //for (int i = 0; i < imageCount; i++) {}
            try {
                Part filePart = req.getPart("file-");
                InputStream fileContent = filePart.getInputStream();
                imageStreams.add(fileContent);
            } catch (Exception e) {
                System.out.println("Error happens while handling image files!");
                e.printStackTrace();
            }
        
        /** Call vision API Helper to predict tags on images */
        List<String> PredictedTags = visionHelper.predictTags(imageStreams, limit);
        res.getWriter().println(gson.toJson(PredictedTags));
    }
}
