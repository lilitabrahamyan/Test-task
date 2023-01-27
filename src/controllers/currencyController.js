const currencyService = require("../services/currencyService.js");

async function getAll(req, res) {
	try {
		const data = await currencyService.getAll();
		console.log(data);
		return res.status(200).send({
			data,
			message: "All available currencies"
		})
	} catch (err) {
		console.log(err, ' In CurrencyController');
		return res.sendStatus(500);
	}
}

module.exports = {
	getAll
}