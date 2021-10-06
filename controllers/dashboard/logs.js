const diffHistory = require('mongoose-diff-history/diffHistory');
const User = require('../../model/User');

const dashboardLogsController = {
    getLogs: async (req, res) => {
        try {
            const { id } = req.params;

            // Find user by id
            const foundUser = await User.findById(id);
            if (!foundUser) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const history = [];

            // Get history of the User Model
            await diffHistory.getDiffs('User', foundUser._id)
                .then(histories => {
                    history.push(histories);
                })
                .catch(err => {
                    res.status(400).json({
                        error: err.message
                    });
                })

            // Get history of the User's Stars Model
            await diffHistory.getDiffs('Stars', foundUser.stars)
                .then(histories => {
                    history.push(histories);
                })
                .catch(err => {
                    res.status(400).json({
                        error: err.message
                    });
                })

            // Get history of the User's buyStars Model
            await diffHistory.getDiffs('BuyStars', foundUser.boughtStars)
                .then(histories => {
                    history.push(histories);
                })
                .catch(err => {
                    res.status(400).json({
                        error: err.message
                    });
                })

            res.status(200).json(history);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = dashboardLogsController;