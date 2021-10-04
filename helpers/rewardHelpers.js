const { updateGlobalStars } = require('../helpers/starsHelpers');
const Reward = require('../model/Reward');
const RewardCategory = require('../model/RewardCategory');
const StarsCategory = require('../model/StarsCategory');

const addReward = async (user, category) => {
    try {
        console.log("Upating Category: ", category);

        const rewardCategories = await RewardCategory.find({});
        const starsCategories = await StarsCategory.find({});

        // For subscription
        const newReward = await Reward.create({
            user_id: user._id,
            category: rewardCategories[0][category],
            stars: starsCategories[0][category],
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