const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserController');

router.post("/signup", userControllers.signup)
router.post("/signin", userControllers.signin)

module.exports = router;