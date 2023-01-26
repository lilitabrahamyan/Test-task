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
    CREATE TABLE CampaignStatus
    (
			status_id          INT           AUTO_INCREMENT,
      status 											VARCHAR(100),
      PRIMARY KEY (status_id)
    )
  `, () => {
		process.exit(0);
	});
} else if (process.argv[2] === 'down') {
	connection.query(`DROP TABLE CampaignStatus CASCADE;`, () => {
		console.log('CampaignStatus table dropped successfully!');
		process.exit(0);
	});
} else {
	console.log('INVALID ARGUMENT');
	process.exit(1);
}