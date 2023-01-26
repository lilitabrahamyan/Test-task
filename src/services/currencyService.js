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

module.exports = {
	getByCriteria
}