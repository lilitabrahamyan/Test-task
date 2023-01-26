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
    CREATE TABLE Donations
    (
      id          INT                 AUTO_INCREMENT,
      campaign_id INT                       NOT NULL,
      amount      DOUBLE                    NOT NULL,
      currency_id INT                      DEFAULT 1,
      nickname    VARCHAR(100)              NOT NULL,
      state       ENUM ('valid', 'invalid') NOT NULL,
      FOREIGN KEY (campaign_id) REFERENCES Campaign (campaign_id) ON DELETE CASCADE,
      FOREIGN KEY (currency_id) REFERENCES Currency (currency_id) ON DELETE CASCADE,
      PRIMARY KEY (id)
    )
  `, () => {
		process.exit(0);
	});
} else if (process.argv[2] === 'down') {
	connection.query(`DROP TABLE Donations CASCADE ;`, () => {
		console.log('Donations table dropped successfully!');
		process.exit(0);
	});
} else {
	console.log('INVALID ARGUMENT');
	process.exit(1);
}