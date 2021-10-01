const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtVerifyToken")
const updateSalary = require('../helpers/salaryManagement');

router.post('/', verifyToken, async (req, res) => {
    const { paidAmount } = req.body;

    await updateSalary(req.data.id, paidAmount)

    res.send('Hello World!');
})

module.exports = router;