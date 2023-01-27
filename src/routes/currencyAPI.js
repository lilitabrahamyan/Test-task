const { Router } = require("express");
const currencyController = require("../controllers/currencyController.js");

const router = Router();

router.get('/', currencyController.getAll);

module.exports = router;
