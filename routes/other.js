const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtVerifyToken")
const { addReward } = require('../helpers/rewardHelpers');
const User = require('../model/User');
const mongoose = require("mongoose");
const RewardCategory = require('../model/RewardCategory');
const StarsCategory = require('../model/StarsCategory');

router.post('/', verifyToken, async (req, res) => {

    // generate RewardCategories and StarCategories
    await new RewardCategory({}).save();
    await new StarsCategory({}).save();

    res.send('Hello World!');
})

module.exports = router;