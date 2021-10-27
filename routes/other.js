const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtVerifyToken")
const User = require('../model/User');
const mongoose = require("mongoose");

router.post('/', verifyToken, async (req, res) => {
    res.send('Hello World!');
})

module.exports = router;