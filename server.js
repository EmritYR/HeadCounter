const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SqlString = require("sqlstring");
const { Client } = require("pg");
const config = require("./config/database");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/*** Hosting server for heroku  ***/
const app = express();

app.use("/", serveStatic(path.join(__dirname, "/dist")));

const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: config.database,
  ssl: true
});

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
usePassport(passport);

start();

app.listen(port, () => console.log("App listening on port: " + port));

/*** End Hosting server for heroku  ***/

// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

/*** Routes ***/

app.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const password = req.body.password;
    const name = req.body.name;
    const id = parseInt(req.body.id);
    var hash = bcrypt.hashSync(password, 10);
    var sql = SqlString.format(
      "INSERT INTO lecturer (lecturer_id, name, password_hash) VALUES (?,?,?)",
      [id, name, hash]
    );

    client.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(201).send(`User added`);
    });
  }
);

app.post("/authenticate", (req, res) => {
  const id = parseInt(req.body.id);
  const password = req.body.password;

  var sql = SqlString.format("SELECT * FROM lecturer WHERE lecturer_id = ?", [
    id
  ]);

  client.query(sql, (err, user) => {
    if (err) res.status(400).send(err);
    else {
      if (!user) {
        return res.json({ success: false, msg: "User not found" });
      }

      user = user.rows[0];
      comparePassword(password, user.password_hash, (err, isMatch) => {
        if (err) res.status(400).send(err);
        if (isMatch) {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800 // 1 week i think
          });
          res.json({
            success: true,
            token: "JWT " + token,
            user: {
              id: user.lecturer_id,
              name: user.name,
              img_url: user.img_url
            }
          });
        } else {
          return res.json({ success: false, msg: "Wrong password" });
        }
      });
    }
  });
});

app.post(
  "/add-course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const description = req.body.description;
    const id = parseInt(req.body.id);
    var sql = SqlString.format(
      "INSERT INTO course (course_id, description, img_url, name) VALUES (?,?,?,?)",
      [id, description, url, name]
    );

    client.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(201).send(`Course added`);
    });
  }
);

app.post(
  "/assign-lecturer",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const lid = parseInt(req.body.lecturer_id);
    const cid = parseInt(req.body.course_id);
    var sql = SqlString.format(
      "INSERT INTO course_lecturers (course_id, lecturer_id) VALUES (?,?,?,?)",
      [cid, lid]
    );

    client.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(201).send(`Course added`);
    });
  }
);

app.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = parseInt(req.body.id);

    var sql = SqlString.format(
      "SELECT course.* FROM course JOIN course_lecturer ON course_lecturers.course_id = course.course_id WHERE course_lecturers.lecturer_id = ?",
      [id]
    );

    client.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  }
);

app.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    client.query("SELECT * FROM lecturer WHERE ", function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  }
);

async function start() {
  await connect();
}

async function connect() {
  try {
    await client.connect();
    console.log("Connected to Database ");
  } catch (e) {
    console.error(`Failed to connect ${e}`);
  }
}

function comparePassword(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

/*** Passport***/

function usePassport(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      client.query(
        "SELECT * FROM lecturer WHERE lecturer_id = " +
          SqlString.escape(jwt_payload.data._id),
        (err, user) => {
          if (err) {
            return done(err, false);
          }

          if (user) {
            return done(null, user.rows[0]);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
}
