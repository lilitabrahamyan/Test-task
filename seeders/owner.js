require("dotenv").config();
const mysql2 = require("mysql2");
const crypto = require("crypto");

const connection = mysql2.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});

const pass = 'test1234';
const hashPass = crypto
  .pbkdf2Sync(pass, process.env.SALT, 1000, 64, 'sha512')
  .toString('hex');

if (process.argv[2] === 'up') {
  connection.query(`
    INSERT INTO Owner
    ( owner_id, username, password, wallet_address ) VALUES (1, 'test1', ?, '1das32sad132ads132asd321sda321')
  `, [hashPass]);
  connection.query(`
    INSERT INTO Owner
    ( owner_id, username, password, wallet_address ) VALUES (2, 'test2', ?, '1das32sad132ads132asd321sd1')
  `, [hashPass]);
  connection.query(`
    INSERT INTO Owner
    ( owner_id, username, password, wallet_address ) VALUES (3, 'test3', ?, '1das32sad132ads132aa321')
  `, [hashPass], () => {
    process.exit(0);
  });
} else if (process.argv[2] === 'down') {
  connection.query(`DELETE FROM Owner;`, () => {
    console.log('Owner table rows deleted successfully!');
    process.exit(0);
  });
} else {
  console.log('INVALID ARGUMENT');
  process.exit(1);
}