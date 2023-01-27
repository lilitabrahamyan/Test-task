const { Router } = require("express");
const cryptoCurrencyController = require("../controllers/cryptoCurrencyController.js");

const router = Router();

router.get('/', cryptoCurrencyController.getAll);

module.exports = router;
