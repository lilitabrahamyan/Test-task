require("dotenv").config();
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS
});

if (process.argv[2] === 'up') {
	connection.query(`
    CREATE TABLE Owner
    (
			owner_id       INT 					 AUTO_INCREMENT,
      username       VARCHAR(100) UNIQUE NOT NULL,
      password       VARCHAR(300) NOT NULL,
      wallet_address VARCHAR(100) UNIQUE NOT NULL,
      PRIMARY KEY (owner_id)
    )
  `, () => {
		process.exit(0);
	});
} else if (process.argv[2] === 'down') {
	connection.query(`DROP TABLE Owner CASCADE;`, () => {
		console.log('Owner table dropped successfully!');
		process.exit(0);
	});
} else {
	console.log('INVALID ARGUMENT');
	process.exit(1);
}