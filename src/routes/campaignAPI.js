const { Router } = require('express');
const campaignController = require("../controllers/campaignController.js");
const { authMiddleware } = require("../core/middlewares/auth.js");
const { body } = require("express-validator");
const { validateRoute } = require("../core/middlewares/validator");

const router = Router();

router.get('/', campaignController.getAll);
router.post(
	'/',
	authMiddleware,
	body('description').isString(),
	body('name').isString(),
	body('expDate').isDate({ format: 'YYYY-MM-DD'}),
	body('goalAmount').isNumeric(),
	validateRoute,
	campaignController.create
);

module.exports = router;