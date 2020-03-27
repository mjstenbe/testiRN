var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8081;


app.use(express.static(__dirname + "/public/travelsite/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Here I show JSON data nicely formatted
app.get("/guestbook", function (req, res) {
  var data = require(__dirname + "/public/guestbook.json");

  var output = '<table border= "5" bgcolor="lightgrey" rowspan="2">';

  for (var i = 0; i < data.length; i++) {
    output +=
      "<tr>" +
      '<td>' +
      "Our visitor: " +
      data[i].username +
      "</td>" +
      '<td>' +
      "From: " +
      data[i].country +
      "</td>" +
      '<td bgcolor="grey">' +
      "Commented following: " +
      data[i].message +
      "</td>" +

      '<td>' +
      data[i].date +
      "</td>" +
      "</tr>";
  }
  res.send(output);
});


// Open form for guests feedback
app.get('/newmessage', function (req, res) {
  res.sendFile(__dirname + "/public/newmessage.html");
});

app.post("/newmessage", function (req, res) {
  var data = require("./public/guestbook.json");

  data.push({
    'username': req.body.username,
    'message': req.body.message,
    'country': req.body.country,
    'date': new Date()
  });

  var lol = JSON.stringify(data)

  fs.writeFile("public/guestbook.json", lol, err => {
    if (err) throw err
    console.log("Saved info");

  });
  res.send(data);
  window.location.replace("/guestbook");
});

app.get('/visitor', function (req, res) {
  res.sendFile(__dirname + "/public/guestbook.html");
});

app.get('/ajaxmessage', function (req, res) {
  res.sendFile(__dirname + "/public/Ajax.html");
});

app.post("/ajaxmessage", function (req, res) {
  res.redirect("./public/guestbook.json");

  /* var username = req.body.username;
   var message = req.body.message;
   var country = req.body.country;
   var date = new Date();
   res.send("Thank YOU: " + username + " from " + country + " Following message: " + message + " is seen!");
   */
  var data = require("./public/guestbook.json");
  data.push({
    'username': req.body.username,
    'message': req.body.message,
    'country': req.body.country,
    'date': new Date()
  });

  var lol = JSON.stringify(data)

  fs.writeFile("public/guestbook.json", lol, err => {
    if (err) throw err
    console.log("Saved info");
  });
  res.send(data);
  //it does not show this text under send box, if I want to save the data... 2 functions with POST ! Problem?
  res.send("Thank YOU: " + username + " from " + country + " Following message: " + message + " is seen!");
});


app.get("*", function (req, res) {
  res.send("Page not found", 404);
})

app.listen(port, function () {
  console.log("Listening port http://127.0.0.1:8081");
});
