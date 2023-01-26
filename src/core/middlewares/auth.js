const jwtService = require("../../services/jwtService.js");

function authMiddleware(req, res, next) {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res
			.status(401)
			.send({
				message: "NotAuthorized",
			});
	}
	const bearer = authHeader.split(' ');

	if (bearer[0].toLowerCase() !== 'bearer' || !bearer[1]) {
		return res
			.status(401)
			.send({
				message: "NotAuthorized",
			});
	}

	const owner = jwtService.verifyToken(bearer[1]);
	if (!owner) {
		return res
			.status(401)
			.send({
				message: "NotAuthorized",
			});
	}

	res.locals.user = owner;
	return next();
}

module.exports = {
	authMiddleware
}