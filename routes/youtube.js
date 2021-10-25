const express = require('express');
const getYoutubeVideos = require('../controllers/YoutubeController');
const { verifyToken } = require('../middlewares/jwtVerifyToken');
const router = express.Router();

router.get("/generateLink", verifyToken, getYoutubeVideos);

module.exports = router;
