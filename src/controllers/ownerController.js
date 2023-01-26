const ownerService = require("../services/ownerService.js");
const { generateAccessToken } = require("../services/jwtService.js");

async function signUp (req, res) {
	try {
		const data = await ownerService.createOwner(req.body);

		data.token = generateAccessToken(data.username, data.owner_id);

		if (!data) {
			return res.status(400).send({
				message: 'ERROR!!! Bad Request!'
			});
		} else if (data.code === 'ER_DUP_ENTRY') {
			return res.status(409).send({
				message: 'ERROR!!! ' + data.sqlMessage
			});
		}

		return res.send({
			data,
			message: 'Signed Up created successfully!'
		});
	} catch (err) {
		console.log(err, 'In OwnerController');
		return res.sendStatus(500);
	}
}

async function signIn (req, res) {
	try {
		const { userName, pass } = req.body

		const data = await ownerService.getOwnerByCriteria('username', userName);

		if (!ownerService.validateOwner(pass, data.password)) {
			return res
				.status(401)
				.send({
					message: "NotAuthorized! INVALID PASSWORD",
				});
		}
		if (!data) {
			return res
				.status(404)
				.send({
					message: "Owner Not Found!",
				});
		}

		data.token = generateAccessToken(data.username, data.owner_id);

		return res.send({
			data,
			message: 'Signed In created successfully!'
		});
	} catch (err) {
		return res.sendStatus(500);
	}
}

module.exports = {
	signUp,
	signIn
}