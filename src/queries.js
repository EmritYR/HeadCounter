const Pool = require("pg").Pool;
const pool = new Pool({
  user: "qqolorykjuhkzg",
  host: "ec2-54-221-195-148.compute-1.amazonaws.com",
  database: "d3bfq4clh09b21",
  password: "aaf3efea7997f8b655d1b34dcffd6c3c5664eafdc4fb58591adef8df6b780a15",
  port: 5432
});

const getUsers = (request, response) => {
  pool.query(
    "SELECT * FROM lecturer ORDER BY lecturer_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getUsers
};
