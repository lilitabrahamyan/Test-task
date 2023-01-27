const { mySqlClient } = require("../core/db-config");

async function getByCriteria(criteria, value) {
	try {
		const [ res ] = await mySqlClient.promise().query(
			`SELECT * FROM Currency WHERE ${criteria} = '${value}';`
		);
		return res?.[0];
	} catch (err) {
		console.log(err, 'In CryptoCurrencyService');
	}
}

async function getAll() {
	try {
		const res = await mySqlClient.promise().query(`SELECT * FROM Currency`);
		console.log(res[0]);
		return res[0];
	} catch (err) {
		console.log(err, 'In CurrencyService');
	}
}

module.exports = {
	getByCriteria,
	getAll
}