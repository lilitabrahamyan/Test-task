const { Router } = require('express');
const { body } = require("express-validator");
const donationsController = require("../controllers/donationsController.js")
const { validateRoute } = require("../core/middlewares/validator.js");

const router = Router();

router.post(
	'/',
	body('nickname').isString().isLength({ min: 2 }),
	body('campaignId').isInt(),
	body('amount').isNumeric(),
	body('currency').isString(),
	validateRoute,
	donationsController.create
);

module.exports = router;