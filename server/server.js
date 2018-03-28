var express = require("express");
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');
var db = new sqlite3.Database("database.db");
var fs = require('fs');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    fs.readFile('index.html', function (err, html) {
         res.writeHeader(200, {"Content-Type": 'text/html'});
         res.write(html);
         res.end();
    });
});

// Get all maps
app.get("/maps", (req, res) => {
    var sql = "SELECT * FROM Map";
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //console.log(JSON.stringify(rows));
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});
// Get all maps that are released
app.get("/maps/released", (req, res) => {
    var sql = "SELECT * FROM Map WHERE status = 'Released'";
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //console.log(JSON.stringify(rows));
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});
// Get all maps that are released
app.get("/maps/unreleased", (req, res) => {
    var sql = "SELECT * FROM Map WHERE status != 'Released'";
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //console.log(JSON.stringify(rows));
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});
// Get single map
app.get("/maps/:id", (req, res) => {
    var sql = "SELECT * FROM Map WHERE id = ?";
    db.serialize(function() {
        db.get(sql, req.params.id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
});
// Get all images for a single map
app.get("/maps/:id/images", (req, res) => {
    var sql = `SELECT location FROM Image
            WHERE map_id = ?`;
    db.serialize(function() {
        db.all(sql, req.params.id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
});
// Get single image for a single map
app.get("/maps/:map_id/images/:image_id", (req, res) => {
    var sql = `SELECT location FROM Image
            WHERE map_id = ? AND id = ?`;
    db.serialize(function() {
        db.get(sql, req.params.map_id, req.params.image_id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
});

// Get all images
app.get("/images", (req, res) => {
    var sql = "SELECT * FROM Image";
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});

// Get single image
app.get("/images/:id", (req, res) => {
    var sql = "SELECT * FROM Image WHERE id = ?";
    db.serialize(function() {
        db.get(sql, req.params.id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});

// Get all images
app.get("/contactMessages", (req, res) => {
    var sql = `SELECT id, name, email, message,
            datetime(recieved, 'localtime') as recieved
            FROM ContactMessage ORDER BY recieved DESC`;
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});

// Get single image
app.get("/contactMessages/:id", (req, res) => {
    var sql = `SELECT id, name, email, message,
            datetime(recieved, 'localtime') as recieved
            FROM contactMessage WHERE id = ?`;
    db.serialize(function() {
        db.get(sql, req.params.id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});

// Get all contact messages
app.post("/contactMessages", (req, res) => {
    var sql = "INSERT INTO contactMessage (name, email, message) VALUES (?, ?, ?)";
    console.log(req.body);
    db.serialize(function() {
        db.get(sql, req.body.name, req.body.email, req.body.message, function(err) {
            if (err) {
                console.log("Error: " + err.message);
                res.status(500);
                res.send("Error..");
            } else {
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(req.body);
            }
        });
    });
    //db.close();
});

// Delete all contact messages
app.delete("/contactMessages", (req, res) => {
    var sql = "DELETE FROM ContactMessage";
    db.serialize(function() {
        db.run(sql, function(err) {
            if (err) {
                console.error( err.message);
                res.status(500);
                res.send("Error..");
            } else {
                res.send("All " + this.changes + " contact messages deleted.");
            }
        });
    });
    //db.close();
});

// Delete single contact mesasge
app.delete("/contactMessages/:id", (req, res) => {
    var sql = "DELETE FROM ContactMessage WHERE id = ?";
    db.serialize(function() {
        db.run(sql, req.params.id, function(err) {
            if (err) {
                console.error( err.message);
                res.status(500);
                res.send("Error..");
            } else {
                res.send("Record with id " + req.params.id + " deleted.");
            }
        });
    });
    //db.close();
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port " + port);
});
