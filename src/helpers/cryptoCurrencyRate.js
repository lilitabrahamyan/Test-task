const axios = require("axios");

async function getCryptoCurrency (cryptoCurrency, currency) {
	try {
		const currencyRates = await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${cryptoCurrency}`);
		return Number(currencyRates.data.data.rates[currency]);
	} catch (err) {
		return 'INVALID CURRENCY!!!';
	}
}

module.exports = {
	getCryptoCurrency
}