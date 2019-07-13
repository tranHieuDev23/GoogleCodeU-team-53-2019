package com.google.codeu.utils;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

/** Filters all paths back to index.html due to SPA client structure. */
@WebFilter("/*")
public class SinglePageAppFilter implements Filter {

  @Override
  public void init(FilterConfig filterConfig) {}

  @Override
  public void destroy() {}

  @Override
  public void doFilter(
      ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {
    String path = ((HttpServletRequest) servletRequest).getServletPath();

    // Continue to servlets architecture if the prefix matches:
    // 1. Servlet Request (api)
    // 2. Google Request (_ah)
    // 3. Static files Request (static)
    if (path.startsWith(ServletLink.SERVLET_PREFIX)
        || path.startsWith("/_ah")
        || path.startsWith("/static")) {
      filterChain.doFilter(servletRequest, servletResponse);
    } else {
      // Redirects back to index.html if the request wasn't intended for a
      // servlet.
      RequestDispatcher dispatcher = servletRequest.getRequestDispatcher(ServletLink.INDEX);
      dispatcher.forward(servletRequest, servletResponse);
    }
  }
}
