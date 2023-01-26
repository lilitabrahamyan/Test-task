const { mySqlClient } = require("../core/db-config.js");

async function getByCriteria(criteria, value) {
  try {
    const [ res ] = await mySqlClient.promise().query(`SELECT * FROM Donations WHERE ${criteria} = '${value}';`);
    return res?.[0];
  } catch (err) {
    console.log(err, ' In DonationService');
  }
}

async function create(campaign_id, amount, nickname, currency_id) {
  try {
    const res = await mySqlClient.promise().query(
      `INSERT INTO Donations (campaign_id, amount, currency_id, nickname) 
           VALUES (?, ?, ?, ?)`,
      [campaign_id, amount, currency_id, nickname]
    );
    return getByCriteria('id', res[0].insertId);
  } catch (err) {
    console.log(err, 'In DonationService');
    return err;
  }
}

module.exports = {
  create,
  getByCriteria
}