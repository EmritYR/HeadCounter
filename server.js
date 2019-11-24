const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/*** Hosting server for heroku  ***/
const app = express();
app.use("/", serveStatic(path.join(__dirname, "/dist")));

const port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port: " + port)
/*** End Hosting server for heroku  ***/

const { Client } = require("pg");
const client = new Client({
  connectionString: 'postgres://qqolorykjuhkzg:aaf3efea7997f8b655d1b34dcffd6c3c5664eafdc4fb58591adef8df6b780a15@ec2-54-221-195-148.compute-1.amazonaws.com:5432/d3bfq4clh09b21',
  ssl: true,
});

client.connect();


app.get("/account", function(req, res) {
  client.query("SELECT * FROM lecturer", function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});


