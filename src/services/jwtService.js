const jwt = require("jsonwebtoken");

function generateAccessToken (username, id) {
	return jwt.sign({	username: username, id: id }, process.env.JWT_SECRET);
}

function verifyToken(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
	generateAccessToken,
	verifyToken
}