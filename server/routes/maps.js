module.exports = function(app){
    // Get all maps
    app.get("/maps", (req, res) => {
        //var sql = "SELECT * FROM Map";
        var sql = `SELECT Map.id, Map.name, Game.name AS game, Map.type, Map.difficulty, Map.length,
                    Map.progress, Map.status, Map.releaseDate, Map.download, Map.description
                    FROM Map INNER JOIN Game ON Map.game = Game.id`;
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

    //other routes..
}
