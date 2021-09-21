const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/jwtVerifyToken")

router.get('/', verifyToken, (req, res) => {
    res.send('Hello World!');
})

module.exports = router;