const express = require('express');
const getYoutubeVideos = require('../controllers/YoutubeController');
const router = express.Router();

router.get("/generateLink", getYoutubeVideos);

module.exports = router;
