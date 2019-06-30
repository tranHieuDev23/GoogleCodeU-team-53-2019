<%@ page import="com.google.codeu.data.Message" %>
<%@ page import="java.util.List" %>
<%String user = (String)request.getAttribute("username"); %>
<%List<Message> messages = (List<Message>)request.getAttribute("messages"); %>
<%boolean isUserLogin = (boolean) !(user == null || user == "");%>
<!DOCTYPE html>
<html>

<head>
  <title> <%=user%> Page</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/user-page.css">
  <script src="js/user-page-loader.js"></script>
  <script src="https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js"></script>
</head>
<nav>
  <ul id="navigation">
    <li><a href="/">Home</a></li>
    <li><a href="/feed.html">Public Feed</a></li>
    <li><a href="/aboutus.html">About Our Team</a></li>
    <li><a href="/stats.html">Stats Page</a></li>
    <li><a href="/chart.html">Chart - Part 2 Demo</a></li>
  </ul>
</nav>
<h1 id="page-title"><%=user%> page</h1>
<%if (isUserLogin) {%>
  <%for (Message message : messages) {%>
    <div class='message-div'>
      <div class='message-header'> <%=message.getTime()%> </div>  
      <div class='message-body'> <%=message.getText()%> </div>  
   </div>
  <%} %>
<%} else  {%>
<a href="/login">Login</a>
<%} %>
<hr />


</body>

</html>