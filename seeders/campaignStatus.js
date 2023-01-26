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
    INSERT INTO CampaignStatus
    ( status_id, status ) VALUES (1, 'active')
  `);
	connection.query(`
    INSERT INTO CampaignStatus
    ( status_id, status ) VALUES (2, 'successful')
  `);
	connection.query(`
    INSERT INTO CampaignStatus
    ( status_id, status ) VALUES (3, 'expired')
  `);
	connection.query(`
    INSERT INTO CampaignStatus
    ( status_id, status ) VALUES (4, 'fraud')
  `, () => {
		process.exit(0);
	});
} else if (process.argv[2] === 'down') {
	connection.query(`DELETE FROM CampaignStatus;`, () => {
		console.log('CampaignStatus table rows deleted successfully!');
		process.exit(0);
	});
} else {
	console.log('INVALID ARGUMENT');
	process.exit(1);
}