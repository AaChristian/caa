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

//require('./routes')(app);

app.get("/", function(req, res) {
    fs.readFile('index.html', function (err, html) {
         res.writeHeader(200, {"Content-Type": 'text/html'});
         res.write(html);
         res.end();
    });
});

// Get all maps
app.get("/maps", (req, res) => {
    //var sql = "SELECT * FROM Map";
    var sql = `SELECT Map.id, Map.name, Game.id AS gameId, Game.name AS game, Map.type, Map.difficulty, Map.length,
                Map.progress, Map.status, Map.releaseDate, Map.download, Map.description
                FROM Map INNER JOIN Game ON Map.game = Game.id`;
    var sqlTypes = `SELECT MapType.id, MapType.name FROM Map
                    INNER JOIN MapIsType ON Map.id = MapIsType.map_id
                    INNER JOIN MapType ON MapIsType.type_id = MapType.id
                    WHERE Map.id = ?;`;
    var result;
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            result = rows;
            var counter = 1;
            rows.forEach((element, index) => {
                //console.log("index: " + index);
                //console.log("counter: " + index);
                result[index].type = [];
                db.each(sqlTypes, element.id, function(err, row) {
                    result[index].type.push(row);
                }, () => {
                    counter++;
                    if (counter > result.length) {
                        //console.log(result);
                        res.json(result);
                    }
                });
            });
            //console.log(JSON.stringify(rows));
            //res.setHeader('Content-Type', 'application/json');
            //res.send(JSON.stringify(rows));
            //res.json(rows);
        });
    });
    //db.close();
});
// Get all maps with their images
app.get("/maps-images", (req, res) => {
    var sql = `SELECT Map.id, Map.name, Map.type, Map.difficulty, Map.length, Map.progress,
                Map.status, Map.releaseDate, Map.download, Map.description, Game.name AS game
                FROM Map INNER JOIN Game ON Map.game = Game.id LIMIT 3`;
    let map_id = -1;
    var json = {};
    var jsonArray = [];
    var result = [];
    var index;
    var imageArr = [];
    console.log("hei..");
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            result = rows;
            console.log("Result length: " + result.length);
            var counter = 1;
            result.forEach((element, index) => {
                console.log("index: " + index);
                console.log("counter: " + index);
                db.all("SELECT id, location FROM Image WHERE map_id = ?", element.id, function(err, rows) {
                    result[index].images = rows;
                    //console.log(element);
                    counter++;
                    if (counter > result.length) {
                        console.log(result);
                        res.json(result);
                    }
                });
            });
        });
    });
});
// Get all maps with their images and map types
app.get("/maps-images-types", (req, res) => {
    var sql = `SELECT Map.id, Map.name, Map.type, Map.difficulty, Map.length, Map.progress,
                Map.status, Map.releaseDate, Map.download, Map.description, Game.name
                FROM Map INNER JOIN Game ON Map.game = Game.id LIMIT 3`;
    var sqlTypes = `SELECT MapType.name FROM Map
                    INNER JOIN MapIsType ON Map.id = MapIsType.map_id
                    INNER JOIN MapType ON MapIsType.type_id = MapType.id
                    WHERE Map.id = ?;`;
    let map_id = -1;
    var json = {};
    var jsonArray = [];
    var result = [];
    var index;
    var imageArr = [];
    console.log("hei..");
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            result = rows;
            console.log("Result length: " + result.length);
            var counter = 1;
            result.forEach((element, index) => {
                console.log("index: " + index);
                console.log("counter: " + index);
                //result[index].type = [];
                db.all("SELECT id, location FROM Image WHERE map_id = ?", element.id, function(err, rows) {
                    result[index].images = rows;
                    //console.log(element);
                    db.all(sqlTypes, element.id, function(err, rows) {
                        result[index].type = rows;
                        counter++;
                        if (counter > result.length) {
                            console.log(result);
                            res.json(result);
                        }
                    });
                });
            });
        });
    });
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
                SET name = ?, game= ?, type = ?, length = ?,
                difficulty = ?, progress = ?, releaseDate = ?, description = ?
                WHERE id = ?`;
    console.log(req.body);
    var params = [req.body.name, req.body.gameId, "NULL", req.body.length, req.body.difficulty,
    req.body.progress, req.body.releaseDate, req.body.description, req.params.id];
    /*for (key in req.body) {
        params.push(req.body[key]);
    }
    params.push(req.params.id);*/
    console.log(params);
    var types = [];
    for (key in req.body.type) {
        types.push(req.body.type[key].id);
    }
    console.log(types);
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
        db.run("DELETE FROM MapIsType WHERE map_id = ?", req.params.id, (err) => {
            if (err) {
                console.error(err.message);
            }
        });
        for (key in req.body.type) {
            types.push(req.body.type[key].id);
            let type = req.body.type[key].id;
            db.run("INSERT INTO MapIsType (map_id, type_id) VALUES (?, ?)", req.params.id, type, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        }
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

// Get all map types
app.get("/map-types", (req, res) => {
    //var sql = "SELECT * FROM Map";
    var sql = `SELECT * FROM MapType`;
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            res.json(rows);
        });
    });
    //db.close();
});

// Get all games
app.get("/games", (req, res) => {
    //var sql = "SELECT * FROM Map";
    var sql = `SELECT * FROM Game`;
    db.serialize(function() {
        db.all(sql, function(err, rows) {
            if (err) {
                console.log("Error: " + err.message);
            }
            res.json(rows);
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
