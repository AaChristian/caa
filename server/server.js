var express = require("express");
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');
var db = new sqlite3.Database("database.db");
var fs = require('fs');
var multer = require("multer");
var path = require("path");

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

// Get all maps TESTT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: Get all images belonging to each map and return those images in the same json object
app.get("/mapstest", (req, res) => {
    var sql = "SELECT * FROM Map LIMIT 2";
    let map_id = -1;
    var json = {};
    var jsonArray = [];
    var result = [];
    console.log("hei..");
    db.serialize(function() {
        db.each(sql, function(err, row) {
            //result = rows;
            var index = row.id - 1;
            //let imageArr = [];
            var imageArr = [];
            jsonArray.push(row);
            //jsonArray[index].images = imageArr;
            map_id = row.id;/*
            db.all("SELECT * FROM Image WHERE map_id = ?", map_id, function(err, rows) {
                //result = rows;
                console.log("map_id: " + row.id);
                console.log(rows);
                var index = row.id - 1;
                console.log("index : " + index);
                jsonArray[index]["images"] = rows;
                //res.json(jsonArray);
            });*/
            db.each("SELECT * FROM Image WHERE map_id = ?", map_id, function(err, rowImage) {
                //result = rows;
                //console.log("map_id: " + rowImage.map_id);
                //console.log(jsonArray[index]);
                //console.log(rowImage);
                //console.log("index : " + index);
                jsonArray.push(rowImage);
                imageArr.push(rowImage);
                //row.images = rowImage;
                //imageArr.push(rowImage);
                //console.log(imageArr);
                //res.json(jsonArray);
            }, () => {

                row.images = imageArr;
                //console.log(row);
                result.push(row);
                console.log(result);
                //jsonArray[index].images.push(imageArr)
            });
        }, () => {
            console.log(result);
            //res.json(jsonArray);
            res.json(result);
            //res.setHeader('Content-Type', 'application/json');
            //res.send(JSON.stringify(result));
        });
        //console.log(result);
        //result.forEach(function(element) {
            //console.log(element);

        //res.json(jsonArray);
        //});

    });/*
    db.serialize(function() {
        result.forEach( (element) => {
            db.all("SELECT * FROM Image WHERE map_id = ?", element.id, function(err, rows) {
                //result = rows;
                console.log(rows);
                res.json(result);
            });
        });

    });*/
    //console.log(result);
    /*db.close(() => {
        res.json(result);
    });*/

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
                res.status(500);
                res.send("Error..");
            }
            //res.send(rows);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
});
// Update single map
app.put("/maps/:id", (req, res) => {
    var sql = `UPDATE Map
                SET name = ?, game= ?, type = ?, length = ?, difficulty = ?, description = ?
                WHERE id = ?`;
    var params = [];
    for (key in req.body) {
        params.push(req.body[key]);
    }
    params.push(req.params.id);
    console.log(params);
    db.serialize(function() {
        db.run(sql, params, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            //res.send(rows);
            //res.setHeader('Content-Type', 'application/json');
            //res.send(JSON.stringify(rows));
            res.json("Map updated!");
        });
    });
});
// Get all images for a single map
app.get("/maps/:id/images", (req, res) => {
    var sql = `SELECT id, location FROM Image
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
// Get only one image from a single map
app.get("/maps/:id/images-first", (req, res) => {
    var sql = `SELECT id, location FROM Image
            WHERE map_id = ? LIMIT 1`;
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
    var sql = `SELECT id, location FROM Image
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

// Delete all contact messages
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

// Delete single contact mesasge
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
        db.run(sql, req.body.name, req.body.email, req.body.message, function(err) {
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

app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port " + port);
});
