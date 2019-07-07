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
  public static final String MESSAGES = SERVLET_PREFIX + "/messages";

  /** Index url handled by the client. */
  public static final String INDEX = "/";
}