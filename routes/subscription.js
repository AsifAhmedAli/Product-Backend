const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwtVerifyToken');
const User = require('../model/User');
const Reward = require('../model/Reward');
const { addReward } = require('../helpers/rewardHelpers');

const rewardReferrer = async (user) => {

    try {
        // Check if the referrer has already subscription rewards
        const alreadySubscribed = await Reward.findOne({ _id: user.rewards[0]._id });

        if (alreadySubscribed) {
            if (alreadySubscribed.category === 'subscription')
                return res.status(400).json({ error: 'You already have a subscription reward' });
        }

        // Add rewards to the referrer
        await addReward(user, "subscription");

        return true;

    } catch (error) {
        throw error.message;
    }
}

router.post('/', verifyToken, async (req, res) => {
    // When user buy a subscription, check if the user has a referrer
    // Buy a subscription ===> waiting on implementation

    try {
        const user = await User.findById(req.data.id);

        // Check if the user has a referrer, then provide awards to the referrer
        if (user.referrer) {
            const foundUser = await User.findById({ _id: user.referrer });

            // Award the referrer
            await rewardReferrer(foundUser);
        }

        // Then update subscription reward
        if (user.rewards.length === 0) {
            await addReward(user, "subscription");
            return res.status(200).json({ message: "Subscription updated" })
        }

        const alreadySubscribed = await Reward.findById({ _id: user.rewards[0]._id });

        if (alreadySubscribed) {
            if (alreadySubscribed.category === 'subscription')
                return res.status(400).json({ error: 'You already have a subscription reward' });
        }


    } catch (error) {
        res.status(500).json({ error: error.message })
    }


})

module.exports = router;
