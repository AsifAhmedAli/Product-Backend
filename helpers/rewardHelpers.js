const { updateGlobalStars } = require('../helpers/starsHelpers');
const Reward = require('../model/Reward');

const addReward = async (user, category) => {
    try {
        console.log(category);

        // For subscription
        const newReward = await Reward.create({
            user_id: user._id,
            category: category,
            stars: 50000,
        })

        // Add new reward to the user
        user.rewards.push(newReward);
        await user.save();

        // update the global stars for the user
        await updateGlobalStars(user, newReward);

    } catch (error) {
        throw error;
    }
}

module.exports = { addReward };