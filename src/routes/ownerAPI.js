const { Router } = require('express');
const userController = require("../controllers/ownerController.js");
const { body } = require("express-validator");
const { validateRoute } = require("../core/middlewares/validator.js");

const router = Router();

router.post(
	'/sign-up',
	body('userName').isString(),
	body('pass').isString().isLength({ min: 8 }),
	body('walletAddress').isString(),
	validateRoute,
	userController.signUp
);
router.post(
	'/sign-in',
	body('userName').isString(),
	body('pass').isString().isLength({ min: 8 }),
	validateRoute,
	userController.signIn
);

module.exports = router;