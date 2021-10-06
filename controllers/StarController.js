const User = require('../model/User');
const Stars = require('../model/Stars');
const BuyStars = require('../model/BuyStars');

const starsController = {
    send: async (req, res) => {
        // Sender id
        const senderId = req.user.id;

        try {
            const { email, starsCount } = req.body;

            if (!email || !starsCount) {
                return res.status(400).json({
                    error: 'Please provide email and stars to be sent'
                })
            }

            const user = await User.findOne({ email });

            if (user) {
                user.password = null;

                // If sending to self
                if (senderId === user._id.toString()) {
                    return res.status(400).json({ error: 'You cannot send stars to yourself' });
                }

                // if the user already has that number of stars
                const totalStars = await Stars.findOne({ user_id: senderId });
                if (totalStars.currentStars < starsCount) {
                    return res.status(400).json({
                        error: 'You dont have enough stars to send'
                    })
                }

                // send stars and update sender's stars
                await Stars.updateOne({ user_id: user._id }, { $inc: { currentStars: starsCount } });
                await Stars.updateOne({ user_id: senderId }, { $inc: { currentStars: -(starsCount) } });

                return res.status(200).json({ message: "Stars sent succesfully" })
            }

            else {
                return res.status(404).json({ error: 'User not found' })
            }

        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }

    },
    buy: async (req, res) => {
        // Sender id
        const buyer = req.user.id;

        try {
            const { pricePaid } = req.body;

            // Check payment here
            // **************************************

            if (!pricePaid) {
                return res.status(400).json({
                    error: 'Please provide correct amount'
                })
            }

            // Check if user has bought subscription
            const ifSubscribed = await User.findById(buyer);

            if (!ifSubscribed.subscription) {
                return res.status(400).json({
                    error: 'You haven\'t bought subscription yet'
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
                return res.status(404).json({ error: 'User not found' })
            }

        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}

module.exports = starsController;