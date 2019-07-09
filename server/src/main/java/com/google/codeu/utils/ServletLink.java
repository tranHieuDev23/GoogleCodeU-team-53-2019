package com.google.codeu.utils;

/** Constants for all servlet links. */
public final class ServletLink {

  /** Private Constructor. */
  private ServletLink() {}

  /** Url prefix for all servlet links. */
  public static final String SERVLET_PREFIX = "/api";

  /** Url handled by {@link LoginServlet}. */
  public static final String LOGIN = SERVLET_PREFIX + "/login";

  /** Url handled by {@link LoginStatusServlet}. */
  public static final String LOGIN_STATUS = SERVLET_PREFIX + "/login-status";

  /** Url handled by {@link LogoutServlet}. */
  public static final String LOGOUT = SERVLET_PREFIX + "/logout";

  /** URL handled by {@link RetrievePostsServlet} */
  public static final String API_RETRIEVE_POSTS = SERVLET_PREFIX + "/retrieve-posts";

  /** URL handled by {@link RetrievePostServlet} */
  public static final String API_RETRIEVE_POST = SERVLET_PREFIX + "/retrieve-post";

  /** URL handled by {@link CreatePostsServlet} */
  public static final String API_CREATE_POST = SERVLET_PREFIX + "/create-post";

  /** URL handled by {@link DeletePostServlet} */
  public static final String API_DELETE_POST = SERVLET_PREFIX + "/delete-post";

  /** Index url handled by the client. */
  public static final String INDEX = "/";

  /** URL to Login page. */
  public static final String LOGIN_PAGE = "/login";

  /** URL to User Page. Format to create a specific URl. */
  public static final String USER_PAGE = "/user/%s";

  /** URL to Create Post Page. */
  public static final String CREATE_POST_PAGE = "/new-post";

  /** URL to Post Page. Format to create a specific URl. */
  public static final String POST_PAGE = "/post/%s";

  /** URL to Tag Page. Format to create a specific URL. */
  public static final String TAG_PAGE = "/tag/%s";
}