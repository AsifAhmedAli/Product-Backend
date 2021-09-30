const Stars = require("../model/Stars")
const BuyStars = require("../model/BuyStars")

const clearStars = async (userId) => {
    try {

        await Stars.findOneAndUpdate({ user_id: userId }, { $set: { currentStars: 0 } })
        await BuyStars.findOneAndUpdate({ user_id: userId }, { $set: { boughtStars: 0 } })
        console.log("Stars cleared");
        return true;

    } catch (error) {
        throw error;
    }

}


const updateGlobalStars = async (user, newReward) => {
    try {
        const oldStars = await Stars.findOne({ user_id: user._id });

        const newStars = +(oldStars.currentStars + newReward.stars);
        await Stars.findOneAndUpdate({ user_id: user._id }, { currentStars: newStars });

        console.log("Global Stars Updated");

        return true;

    } catch (error) {
        throw error.message
    }
}

module.exports = { clearStars, updateGlobalStars }