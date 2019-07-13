package com.google.codeu.utils;

import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.ast.Node;
import com.vladsch.flexmark.util.options.MutableDataSet;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Process input from user, transform markdown to HTML */
public class UserInput {

  public static String sanitizingHtmlInput(String htmlString) {
    String text = Jsoup.clean(htmlString, Whitelist.basic());
    return text;
  }

  public static String TransformToHTML(String markdownString) {
    MutableDataSet options = new MutableDataSet();

    Parser parser = Parser.builder(options).build();
    HtmlRenderer renderer = HtmlRenderer.builder(options).build();
    Node document = parser.parse(markdownString);
    String htmlString = renderer.render(document);
    return htmlString;
  }
}
