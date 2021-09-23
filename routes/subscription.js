const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const verifyToken = require('../middlewares/jwtVerifyToken');
const User = require('../model/User');
const Reward = require('../model/Reward');

router.post('/', verifyToken, async (req, res) => {
    // When user buy a subscription, check if the user has a referrer
    // Buy a subscription ===> waiting on implementation

    try {
        const user = await User.findById(req.data.id);

        // Check if the user has a referrer, then provide awards to the referrer
        if (user.referrer) {
            const foundUser = await User.findById({ _id: user.referrer });
            // Check if the referrer has already subscription rewards
            const alreadySubscribed = await Reward.findOne({ _id: foundUser.rewards[0]._id });

            if (alreadySubscribed) {
                if (alreadySubscribed.category === 'subscription')
                    return res.status(400).json({ message: 'You already have a subscription reward' });
            }

            // Add rewards to the referrer
            const newReward = await Reward.create({
                user_id: foundUser._id,
                category: "subscription",
                stars: 100,
            })

            // Add new reward to the referrer
            foundUser.rewards.push(newReward);
            const temp = await foundUser.save();

            return res.status(200).json({ message: "Subscription updated" })
        }

        // If no referrer just update subscription
        const newReward = await Reward.create({
            user_id: user._id,
            category: "subscription",
            stars: 100,
        })

        // Add new reward to the user
        user.rewards.push(newReward);
        const temp = await user.save();

        return res.status(200).json({ message: "Subscription updated" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


})

module.exports = router;
