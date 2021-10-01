const express = require("express");
const { addReward } = require("../helpers/rewardHelpers");
const { verifyToken } = require("../middlewares/jwtVerifyToken");
const User = require("../model/User");
const router = express.Router();

router.post('/add', verifyToken, async (req, res) => {

    try {
        const { category } = req.body;
        const user = await User.findById(req.data.id);

        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        await addReward(user, category);

        console.log("Reward Added for Category: ", category);

        return res.status(200).json({ message: 'reward Added' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;