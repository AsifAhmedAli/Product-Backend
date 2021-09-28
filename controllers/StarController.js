const User = require('../model/User');
const Stars = require('../model/Stars');
const BuyStars = require('../model/BuyStars');

const starsController = {
    send: async (req, res) => {
        // Sender id
        const senderId = req.data.id;

        try {
            const { email, starsCount } = req.body;

            if (!email || !starsCount) {
                return res.status(400).json({
                    message: 'Please provide email and stars to be sent'
                })
            }

            const user = await User.findOne({ email });

            if (user) {
                user.password = null;

                // If sending to self
                if (senderId === user._id.toString()) {
                    return res.status(500).json({ message: 'You cannot send stars to yourself' });
                }

                // if the user already has that number of stars
                const totalStars = await Stars.findOne({ user_id: senderId });
                if (totalStars.currentStars < starsCount) {
                    return res.status(400).json({
                        message: 'You dont have enough stars to send'
                    })
                }

                // send stars
                await Stars.updateOne({ user_id: user._id }, { $inc: { currentStars: starsCount } });
                const temp = await Stars.updateOne({ user_id: senderId }, { $inc: { currentStars: -(starsCount) } });
                console.log(temp)
                return res.status(200).json({ message: "Stars sent succesfully" })
            }

            else {
                return res.status(500).json({ message: 'User not found' })
            }

        }
        catch (err) {
            res.status(400).json(err.message);
        }

    },
    buy: async (req, res) => {
        // Sender id
        const buyer = req.data.id;

        try {
            const { pricePaid } = req.body;

            // Check payment here
            // **************************************

            if (!pricePaid) {
                return res.status(400).json({
                    message: 'Please provide correct amount'
                })
            }

            const user = await User.findOne({ buyer });

            if (user) {
                user.password = null;

                // Stars calculate according to price paid
                const starsCalculatedPerPrice = pricePaid * 100;

                // update the global stars of the user
                const globalStars = await Stars.updateOne({ user_id: buyer }, { $inc: { currentStars: starsCalculatedPerPrice } });

                // Update bought Stars only
                const temp = await BuyStars.updateOne({ user_id: buyer }, { $inc: { boughtStars: starsCalculatedPerPrice } });

                return res.status(200).json({ message: "Stars bought succesfully" })
            }

            else {
                return res.status(500).json({ message: 'User not found' })
            }

        }
        catch (err) {
            res.status(400).json(err.message);
        }

    }
}

module.exports = starsController;