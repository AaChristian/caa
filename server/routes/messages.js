module.exports = (app, db) => {
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

    // Add contact message
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
}
