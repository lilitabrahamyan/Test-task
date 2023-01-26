const mysql2 = require("mysql2");
require("dotenv").config();

const mySqlClient = mysql2.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});

async function test () {

}

module.exports = {
  mySqlClient
}