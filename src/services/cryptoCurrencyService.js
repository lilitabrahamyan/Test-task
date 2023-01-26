const { mySqlClient } = require("../core/db-config.js");

async function getAll() {
	try {
		const res = await mySqlClient.promise().query(`SELECT * FROM CryptoCurrency`);
		return res[0];
	} catch (err) {
		console.log(err, 'In CryptoCurrencyService');
	}
}

async function getByCriteria(criteria, value) {
	try {
		const [ res ] = await mySqlClient.promise().query(
			`SELECT * FROM CryptoCurrency WHERE ${criteria} = '${value}';`
		);
		return res?.[0];
	} catch (err) {
		console.log(err, 'In CryptoCurrencyService');
	}
}

module.exports = {
	getAll,
	getByCriteria
}