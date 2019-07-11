
/**
 * one way to allow the user to specify a bucket name when writing a file to a bucket
 */
function uploadFile() {
  var bucket = document.forms["putFile"]["bucket"].value;
  var filename = document.forms["putFile"]["fileName"].value;
  if (bucket == null || bucket == "" || filename == null || filename == "") {
    alert("Both Bucket and FileName are required");
    return false;
  } else {
    var postData = document.forms["putFile"]["content"].value;
    document.getElementById("content").value = null;

    var request = new XMLHttpRequest();
    request.open("POST", "/gcs/" + bucket + "/" + filename, false);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(postData);
  }
}
