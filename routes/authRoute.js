const express = require('express');
const { SignUp, login } = require("../controllers/authController");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/signup').post(SignUp);
router.route('/login').post(login);

module.exports = router;