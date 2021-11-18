const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/jwtVerifyToken');

// @desc    user/me
// @route   POST
router.get("/me", verifyToken, userControllers.me)

// @desc    user/signup
// @route   POST
router.post("/signup", userControllers.signup)

// @desc    user/signin
// @route   POST
router.post("/signin", userControllers.signin)

// @desc    user/logout
// @route   GET
router.get("/logout", userControllers.logout)

module.exports = router;