const { validationResult } = require("express-validator");

function validateRoute (req, res, next) {
	const errors = validationResult(req);
	if (errors.errors.length) {
		return res.status(400).send({
			Errors: errors.errors
		});
	} else {
		return next();
	}
}

module.exports = {
	validateRoute
}