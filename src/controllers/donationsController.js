const donationService = require("../services/donationsService.js");
const campaignService = require("../services/campaignService.js");
const cryptoCurrencyService = require("../services/cryptoCurrencyService.js");
const { getCryptoCurrency } = require("../helpers/cryptoCurrencyRate.js");
const currencyService = require("../services/cryptoCurrencyService.js");

async function create (req, res) {
  try {
    const { campaignId, nickname, currency } = req.body;
    let { amount } = req.body;
    let currency_id;
    const { isCrypto } = req.query;

    const campaign = await campaignService.getByCriteria('campaign_id', campaignId);
    if (isCrypto === 'true') {
      const isValid = await cryptoCurrencyService.getByCriteria('crypto_currency', currency);
      if (!isValid) {
        return res.status(400).send({
          message: 'ERROR!!! UNAVAILABLE CRYPTO CURRENCY!'
        });
      } else {
        const currencyRate = await getCryptoCurrency(currency, campaign.currency);
        currency_id = campaign.currency_id
        amount = currencyRate * amount;
      }
    } else {
      const isValid = await currencyService.getByCriteria('currency', currency);
      if (!isValid) {
        return res.status(400).send({
          message: 'ERROR!!! UNAVAILABLE CURRENCY!'
        });
      }
      currency_id = isValid.currency_id;
    }
    if (campaign.status === 'active') {
      const newCurrentAmount = campaign.current_amount + amount;

      if (newCurrentAmount >= campaign.goal_amount) {
        await campaignService.updateByCriteria(campaignId, 'status', 2);
      }

      await campaignService.updateByCriteria(campaignId, 'current_amount', newCurrentAmount);
      const data = await donationService.create(campaignId, amount, nickname, currency_id);

      if (!data) {
        return res.status(400).send({
          message: 'ERROR!!! Bad Request!'
        });
      } else if (data.code === 'ER_DUP_ENTRY') {
        return res.status(409).send({
          message: 'ERROR!!! ' + data.sqlMessage
        });
      }

      return res
        .status(201)
        .send({
          data,
          message: "Donation created successfully!"
        });
    } else {
      return res.status(400).send({
        message: "ERROR!!! Bad Request! Campaign can't be donated!"
      });
    }
  } catch (err) {
    console.log(err, ' In DonationController');
    return res.sendStatus(500);
  }
}

module.exports = {
  create
}
