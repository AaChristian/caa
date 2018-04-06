var express = require("express");
var sqlite3 = require("sqlite3").verbose();

var bodyParser = require('body-parser');
var fs = require('fs');

var maps = require("./routes/maps.js");
var images = require("./routes/images.js");
var messages = require("./routes/messages.js");
var types = require("./routes/mapTypes.js");
var games = require("./routes/games.js");

var db = new sqlite3.Database("database.db");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get modules from other files
maps(app, db);
images(app, db);
messages(app, db);
types(app, db);
games(app, db);

// Show index.html with info about API on root
app.get("/", function(req, res) {
    fs.readFile('index.html', function (err, html) {
         res.writeHeader(200, {"Content-Type": 'text/html'});
         res.write(html);
         res.end();
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port " + port);
});
