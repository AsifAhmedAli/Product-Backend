const User = require('../model/User');
const Stars = require('../model/Stars');

const starsController = {
    send: async (req, res) => {
        // Sender id
        const senderId = req.data.id;

        try {
            const { email, starsCount } = req.body;

            if (!email || !starsCount) {
                res.status(400).json({
                    message: 'Please provide email and stars to be sent'
                })
            }

            const user = await User.findOne({ email });
            user.password = null;

            const totalStars = await Stars.findOne({ user_id: senderId });
            if (totalStars.currentStars < starsCount) {
                return res.status(400).json({
                    message: 'You dont have enough stars to send'
                })
            }

            // Check if the user already has that number of stars
            if (user.stars < starsCount) {
                return res.status(500).json({ error: "You dont have enough stars" })
            }

            // send stars
            const temp = await Stars.findOneAndUpdate({ user_id: user._id }, { $inc: { currentStars: starsCount } });

            return res.status(200).json({ message: "Stars sent succesfully" })
        }
        catch (err) {
            res.status(400).json(err.message);
        }

    }
}

module.exports = starsController;