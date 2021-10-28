const express = require('express');
const EmailUrl = require('../model/EmailUrl');
const User = require('../model/User');
const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const completeURL = req.protocol + "://" + req.get('host') + req.originalUrl;

        const { email } = req.query;

        const foundUser = await User.findOne({ email });
        const verifyEmail = await EmailUrl.findOne({ url: completeURL });

        if (!foundUser) {
            return res.status(400).json({ error: 'Email not registered, Signup again' });
        }

        if (!verifyEmail) {
            return res.status(404).json({ error: 'Invalid Verification Link' });
        }

        if (foundUser.verified === true) {
            return res.status(401).json({ error: 'Email already verified' });
        }

        foundUser.verified = true;
        await foundUser.save();

        return res.json({
            success: true,
            message: "User verified successfully"
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;