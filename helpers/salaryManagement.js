const Stars = require("../model/Stars")
const Salary = require("../model/Salary")
const User = require('../model/User');
const clearStars = require('../helpers/clearStars');
const BuyStars = require("../model/BuyStars");

const updateSalary = async (id, paidAmount) => {
    const userStars = await Stars.findOne({ user_id: id });
    const userBoughtStars = await BuyStars.findOne({ user_id: id });

    const globalStars = userStars.currentStars;
    const boughtStars = userBoughtStars.boughtStars;

    const difference = globalStars - boughtStars;

    const boughtStarsSalary = (boughtStars * 90) / 10000;
    const earnedStarsSalary = (difference * 70) / 10000;
    const totalSalary = boughtStarsSalary + earnedStarsSalary;

    console.log("totalSalary", totalSalary);
    console.log("boughtSalary: ", boughtStarsSalary);
    console.log("earnedSalary", earnedStarsSalary);

    await clearStars(id);

    const payment = true;

    if (payment) {
        const calculatedAmount = paidAmount * 100;
        // await Salary.findOneAndUpdate({ user_id: id }, { amount })
    }

    return true;
}

module.exports = updateSalary;