module.exports = (app, db) => {
    // Get all maps with types
    app.get("/maps", (req, res) => {
        //var sql = "SELECT * FROM Map";
        var sql = `SELECT Map.id, Map.name, Game.id AS gameId, Game.name AS game, Map.type,
                    Map.difficulty, Map.length, Map.progress, Map.status, Map.releaseDate,
                    Map.download, Map.description
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
                // Get types for each returned row
                rows.forEach((element, index) => {
                    result[index].type = [];
                    db.each(sqlTypes, element.id, function(err, row) {
                        result[index].type.push(row);
                    }, () => {
                        counter++;
                        // If all returned rows (maps) processed, return json result
                        if (counter > result.length) {
                            //console.log(result);
                            res.json(result);
                        }
                    });
                });
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
}
