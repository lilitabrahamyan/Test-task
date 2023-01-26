const { mySqlClient } = require("../core/db-config.js");
const crypto = require("crypto");

async function getOwnerByCriteria(criteria, value) {
	try {
		const [ res ] = await mySqlClient.promise().query(`SELECT * FROM Owner WHERE ${criteria} = '${value}';`);
		return res?.[0];
	} catch (err) {
		console.log(err, ' Owner Service');
	}
}

async function createOwner(ownerData) {
	try {
		const { userName, walletAddress, pass } = ownerData;
		const hashedPass = crypto
			.pbkdf2Sync(pass, process.env.SALT, 1000, 64, 'sha512')
			.toString('hex');

		await mySqlClient.promise().query(
			`INSERT INTO Owner (username, password, wallet_address) VALUES (?, ?, ?);`,
			[userName,hashedPass, walletAddress]
		);

		return getOwnerByCriteria('username', userName);
	} catch (err) {
		console.log(err, ' Owner Service');
		return err;
	}
}

function validateOwner(pass, hash) {
	const newHash = crypto
		.pbkdf2Sync(pass, process.env.SALT, 1000, 64, 'sha512')
		.toString('hex');
	return newHash === hash;
}

module.exports = {
	getOwnerByCriteria,
	createOwner,
	validateOwner
}