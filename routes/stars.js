const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtVerifyToken');
const starsController = require('../controllers/StarController');

router.post("/send", verifyToken, starsController.send);
router.post("/buy", verifyToken, starsController.buy);

module.exports = router;