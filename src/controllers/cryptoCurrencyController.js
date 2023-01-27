const cryptoCurrencyService = require("../services/cryptoCurrencyService.js");

async function getAll(req, res) {
	try {
		const data = await cryptoCurrencyService.getAll();
		return res.status(200).send({
			data,
			message: "All available cryptoCurrencies"
		})
	} catch (err) {
		console.log(err, ' In CryptoCurrencyController');
		return res.sendStatus(500);
	}
}

module.exports = {
	getAll
}