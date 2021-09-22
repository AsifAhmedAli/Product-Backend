const User = require('../model/User');

const redeemRewards = async (id) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findById(id);
        if (!user) {
            reject('User not found');
        }

        const updateCount = await User.updateOne({ _id: id }, { $inc: { referralCount: 1 } });
        if (!updateCount) {
            reject("Error updating the Referral Count")
        }
        resolve("updated referral Count");
    })
}


module.exports = redeemRewards;