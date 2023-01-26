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
    INSERT INTO CryptoCurrency
    ( crypto_currency_id, crypto_currency ) VALUES (1, 'ETH')
  `, () => {
		process.exit(0);
	});

	connection.query(`
    INSERT INTO CryptoCurrency
    ( crypto_currency_id, crypto_currency ) VALUES (2, 'BTC')
  `, () => {
		process.exit(0);
	});
} else if (process.argv[2] === 'down') {
	connection.query(`DELETE FROM CryptoCurrency;`, () => {
		console.log('CryptoCurrency table rows deleted successfully!');
		process.exit(0);
	});
} else {
	console.log('INVALID ARGUMENT');
	process.exit(1);
}