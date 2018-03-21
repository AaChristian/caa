var express = require("express");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

const app = express();
const port = 5000;
// Get all maps
app.get("/maps", (req, res) => {
    var sql = "SELECT * FROM Map";
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            res.send(rows);
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
            res.send(rows);
        });
    });
});
// Get all images for a single map
app.get("/maps/:id/images", (req, res) => {
    var sql = `SELECT Image.location FROM Map
            INNER JOIN MapHasImages ON Map.id = MapHasImages.map_id
            INNER JOIN Image ON Image.id = MapHasImages.image_id
            WHERE Map.id = ?`;
    db.serialize(function() {
        db.all(sql, req.params.id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            res.send(rows);
        });
    });
});
// Get single image for a single map
app.get("/maps/:map_id/images/:image_id", (req, res) => {
    var sql = `SELECT Image.location FROM Map
            INNER JOIN MapHasImages ON Map.id = MapHasImages.map_id
            INNER JOIN Image ON Image.id = MapHasImages.image_id
            WHERE Map.id = ? AND Image.id = ?`;
    db.serialize(function() {
        db.get(sql, req.params.map_id, req.params.image_id, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            res.send(rows);
        });
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port " + port);
});
