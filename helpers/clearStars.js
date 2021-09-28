const Stars = require("../model/Stars")
const BuyStars = require("../model/BuyStars")
const Salary = require("../model/Salary")
const User = require('../model/User');

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

module.exports = clearStars