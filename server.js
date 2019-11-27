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

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
usePassport(passport);

start();

app.listen(port, () => console.log("App listening on port: " + port));

/*** End Hosting server for heroku  ***/

// Index Route
app.get("/", (req, res) => {
  res.status(122).send("invalid endpoint");
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
        res.status(400).send(err);
      } else {
        res.status(201).send(`User added`);
      }
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
    else if (!user.rows[0]) {
      return res.json({ success: false, msg: "User not found" });
    } else {
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
    const id = req.body.id;
    var sql = SqlString.format(
      "INSERT INTO course (course_id, description, img_url, name) VALUES (?,?,?,?)",
      [id, description, url, name]
    );

    client.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(201).send(`Course added`);
    });
  }
);

app.post(
  "/assign-lecturer",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const lid = parseInt(req.body.lecturer_id);
    const cid = req.body.course_id;
    var sql = SqlString.format(
      "INSERT INTO course_lecturers (course_id, lecturer_id) VALUES (?,?)",
      [cid, lid]
    );

    client.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(201).send(`Lecturer Assigned`);
    });
  }
);

app.post(
  "/add-student",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const class_id = parseInt(req.body.class_id);
    const student_id = parseInt(req.body.student_id);
    const current_timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    var sql = SqlString.format(
      "INSERT INTO attendance_log (class_id, student_id, timestamp_date) VALUES (?,?,?)",
      [class_id, student_id, current_timestamp]
    );

    client.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(201).send(`Student added`);
    });
  }
);

app.post(
  "/create-student",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.body.name;
    const student_id = parseInt(req.body.student_id);

    var sql = SqlString.format(
      "INSERT INTO student (student_id, name) VALUES (?,?)",
      [student_id, name]
    );

    client.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(201).send(`Student created`);
    });
  }
);

app.delete(
  "/delete-student",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const class_id = parseInt(req.body.class_id);
    const student_id = parseInt(req.body.student_id);
    var sql = SqlString.format(
      "DELETE FROM attendance_log WHERE class_id = ? AND student_id = ?",
      [class_id, student_id]
    );

    client.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(201).send(`Student remove`);
    });
  }
);

app.get(
  "/courses/:course_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const cid = req.params.course_id;
    var sql = SqlString.format("SELECT * FROM class WHERE course_id = ?", [
      cid
    ]);

    client.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(201).send(result.rows);
    });
  }
);

app.get(
  "/courses/class/:class_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const cid = parseInt(req.params.class_id);
    var sql = SqlString.format(
      "SELECT student.student_id, student.name FROM attendance_log JOIN student ON student.student_id = attendance_log.student_id WHERE class_id = ?",
      [cid]
    );

    client.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(201).send(result.rows);
    });
  }
);

app.get(
  "/courses/all/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = parseInt(req.params.id);

    var sql = SqlString.format(
      "SELECT course.course_id, course.name FROM course JOIN course_lecturers ON course_lecturers.course_id = course.course_id WHERE course_lecturers.lecturer_id = ?",
      [id]
    );

    client.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(200).send(result.rows);
    });
  }
);

app.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    client.query("SELECT * FROM lecturer ", function(err, result) {
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
          SqlString.escape(jwt_payload.data.lecturer_id),
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
