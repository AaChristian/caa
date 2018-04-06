module.exports = (app, db) => {
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
}
