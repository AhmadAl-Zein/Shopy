const express = require('express');
const { addProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/:brandid').post(addProduct);
router.route('/').get(getProducts);

module.exports = router;