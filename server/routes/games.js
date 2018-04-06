module.exports = (app, db) => {
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
}
