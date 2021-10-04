const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtVerifyToken")
const { addReward } = require('../helpers/rewardHelpers');
const User = require('../model/User');
const mongoose = require("mongoose");

router.post('/', verifyToken, async (req, res) => {
    const { category } = req.body;
    const user = await User.findById(req.user.id);
    // get model history
    console.log(mongoose.model('Users_history'));
    // await addReward(user, category)

    res.send('Hello World!');
})

module.exports = router;