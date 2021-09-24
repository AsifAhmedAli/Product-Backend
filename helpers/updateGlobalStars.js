const Stars = require("../model/Stars");

const updateGlobalStars = async (user, newReward) => {
    try {
        console.log(user);
        const oldStars = await Stars.findOne({ user_id: user._id });
        console.log(oldStars)
        const newStars = +(oldStars.currentStars + newReward.stars);
        console.log("Stars updated");
        await Stars.findOneAndUpdate({ user_id: user._id }, { currentStars: newStars });

        return true;

    } catch (error) {
        throw error.message
    }
}

module.exports = updateGlobalStars;