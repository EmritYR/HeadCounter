const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
app.use("/", serveStatic(path.join(__dirname, "/dist")));

const { Client } = require("pg");
const connectionString =
  "postgres://qqolorykjuhkzg:aaf3efea7997f8b655d1b34dcffd6c3c5664eafdc4fb58591adef8df6b780a15@ec2-54-221-195-148.compute-1.amazonaws.com:5432/d3bfq4clh09b21";

const client = new Client({
  connectionString: connectionString
});

client.connect();

const port = process.env.PORT || 8080;

app.get("/account", function(req, res, next) {
  client.query("SELECT * FROM lecturer", [1], function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

app.listen(port);
