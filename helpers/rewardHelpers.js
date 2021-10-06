const { updateGlobalStars } = require('../helpers/starsHelpers');
const BuyStars = require('../model/BuyStars');
const Reward = require('../model/Reward');
const RewardCategory = require('../model/RewardCategory');
const Stars = require('../model/Stars');
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

        // Add new reward to the user and Update the subscription to TRUE
        user.rewards.push(newReward);
        user.subscription = true;
        await user.save();

        // update the global stars for the user
        await updateGlobalStars(user, newReward);

    } catch (error) {
        throw error;
    }
};

const addCustomReward = async (user, category, starsReward = 0) => {
    try {
        console.log("Upating Category: ", category);

        const rewardCategories = await RewardCategory.find({});

        // For subscription
        const newReward = await Reward.create({
            user_id: user._id,
            category: rewardCategories[0][category],
            stars: starsReward,
        })

        // Add new reward to the user and Update the subscription to TRUE
        user.rewards.push(newReward);
        user.subscription = true;
        await user.save();

        // update the global stars for the user
        await updateGlobalStars(user, newReward);

    } catch (error) {
        throw error;
    }
}

module.exports = { addReward, addCustomReward };