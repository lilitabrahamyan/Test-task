const { Router } = require('express');
const donationsController = require("../controllers/donationsController.js")
const { body } = require("express-validator");
const {validateRoute} = require("../core/middlewares/validator");

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