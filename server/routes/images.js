var fs = require('fs');
var multer = require("multer");
var path = require("path");

module.exports = (app, db) => {
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

    // Delete all images
    app.delete("/images", (req, res) => {
        var sql = "DELETE FROM Image";
        db.serialize(function() {
            db.run(sql, function(err) {
                if (err) {
                    console.error( err.message);
                    res.status(500);
                    res.send("Error..");
                } else {
                    res.send("All " + this.changes + " images deleted.");
                }
            });
        });
        //db.close();
    });

    // Delete single image
    app.delete("/images/:id", (req, res) => {
        var sql = "SELECT * FROM Image WHERE id = ?";
        var sqlDelete = "DELETE FROM Image WHERE id = ?";
        let filename = "";
        db.serialize(function() {
            db.get(sql, req.params.id, function(err, row) {
                if (err) {
                    console.log("Error: " + err.message);
                    res.status(500);
                    res.send("Error..");
                } else {
                    console.log(row);
                    filename = row.location;
                }
            });
            db.run(sqlDelete, req.params.id, function(err) {
                if (err) {
                    console.error( err.message);
                    res.status(500);
                    res.send("Error..");
                } else {
                    fs.unlink("../public/media/mapImages/" + filename, (err) => {
                        if (err) {
                            throw err;
                        }
                        res.send("Record with id " + req.params.id + " deleted. Filename: " + filename);
                    });
                }
            });
        });

        //db.close();
    });

    const storage = multer.diskStorage({
        destination: "../public/media/mapImages/",
        filename: function (req, file, cb) {
            console.log(req.body);
            cb(null, req.body.mapId + "-" + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage
    }).single("mapImage");

    app.post("/upload-map-image", (req, res) => {
        console.log("Uploading image..");
        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.send("Error..");
            } else {
                /*
                    Map uploaded, now store it in the Image table
                    and connect it to req.body.mapId
                */
                //console.log(req.body.mapId);
                //console.log("Image uploaded!");
                var json = {};
                var sql = "INSERT INTO Image (location, map_id) VALUES (?, ?)";
                console.log(req.body);
                db.serialize(function() {
                    db.run(sql, req.file.filename, req.body.mapId, function(err) {
                        if (err) {
                            console.log("Error: " + err.message);
                            res.status(500);
                            res.send("Error..");
                        } else {
                            //res.send(rows);
                            json.id = this.lastID;
                            json.location = req.file.filename;
                            json.map_id = req.body.mapId;
                            console.log(json);
                            res.setHeader('Content-Type', 'application/json');
                            res.send(json);
                        }
                    });
                });
            }
        });
    });

}
