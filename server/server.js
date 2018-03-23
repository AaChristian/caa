var express = require("express");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");
const nodemailer = require("nodemailer");

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
            console.log(JSON.stringify(rows));
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
    var sql = `SELECT Image.location FROM Map
            INNER JOIN MapHasImages ON Map.id = MapHasImages.map_id
            INNER JOIN Image ON Image.id = MapHasImages.image_id
            WHERE Map.id = ?`;
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
    var sql = `SELECT Image.location FROM Map
            INNER JOIN MapHasImages ON Map.id = MapHasImages.map_id
            INNER JOIN Image ON Image.id = MapHasImages.image_id
            WHERE Map.id = ? AND Image.id = ?`;
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

// Get single image
app.post("/send-mail", (req, res) => {
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      let mailOptions = {
        from: "'C. Aa.' <caa@example.com>",
        to: "heisann@test.no",
        subject: "Test emne..",
        text: "Dette er en test epost!"
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port " + port);
});
