const campaignService = require('../services/campaignService.js');

async function getAll (req, res) {
	try {
		const data = await campaignService.getAll();
		return res.send({
			data,
			message: 'All campaigns'
		});
	} catch (err) {
		return res.sendStatus(500);
	}
}

async function create(req, res) {
	try {
		const { description, name, goalAmount, expDate } = req.body;
		if (!(description &&  goalAmount &&  expDate && name)) {
			return res.status(400).send({
				message: 'ERROR!!! Bad Request!'
			});
		}

		const data = await campaignService.create(res.locals.user.id, description, goalAmount, expDate, name);

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
				message: "Campaign created successfully!"
			});
	} catch (err) {
		return res.sendStatus(500);
	}
}

module.exports = {
	getAll,
	create
}