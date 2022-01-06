const express = require('express');
const { addBrand } = require("../controllers/brandController");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/').post(addBrand);

module.exports = router;