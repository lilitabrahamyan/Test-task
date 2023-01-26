const { mySqlClient } = require("../core/db-config.js");
const uuid = require('uuid').v4;

async function getAll() {
	try {
		const [res] = await mySqlClient.promise().query(
			`SELECT * FROM Campaign
    			 JOIN CampaignStatus ON Campaign.status = CampaignStatus.status_id
           JOIN Owner ON Campaign.owner_id = Owner.owner_id
           JOIN Currency ON Campaign.currency = Currency.currency_id`
		);
		return res;
	} catch (err) {
		console.log(err, 'In CampaignService');
	}
}

async function getByCriteria(criteria, value) {
	try {
		const [ res ] = await mySqlClient.promise().query(
			`SELECT * FROM Campaign 
					JOIN CampaignStatus ON Campaign.status = CampaignStatus.status_id 
					JOIN Owner ON Campaign.owner_id = Owner.owner_id 
					JOIN Currency ON Campaign.currency = Currency.currency_id WHERE ${criteria} = '${value}';`
		);
		return res?.[0];
	} catch (err) {
		console.log(err, ' Campaign Service');
	}
}

async function create(owner_id,	description, goal_amount,	exp_date, name) {
	try {
		const res = await mySqlClient.promise().query(
			`INSERT INTO Campaign (owner_id, u_Id, name, description, goal_amount, exp_date) 
					  VALUES (?, ?, ?, ?, ?, ?);`,
			[owner_id, uuid(), name,	description, goal_amount,	exp_date]
		);

		return getByCriteria('campaign_Id', res[0].insertId);
	} catch (err) {
		console.log(err, ' Campaign Service');
		return err;
	}
}

async function updateByCriteria(campaignId, criteria, value) {
	try {
		return mySqlClient.promise().query(`UPDATE Campaign SET ${criteria} = ${value} WHERE campaign_id = ${campaignId};`);
	} catch (err) {
		console.log(err, ' Campaign Service');
		return err;
	}
}

module.exports = {
	getAll,
	getByCriteria,
	create,
	updateByCriteria
}