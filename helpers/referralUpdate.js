const User = require('../model/User');

const referralUpdate = async (referrerId, createdUserId) => {
    try {
        // Find the user
        const user = await User.findById(referrerId);

        if (!user) {
            return { error: 'User not found' };
        }

        // Update the referrer's referral count
        const updateCount = await User.updateOne({ _id: referrerId }, { $inc: { referralCount: 1 } });

        // Update the target's referrer field
        const updateReferrer = await User.updateOne({ _id: createdUserId }, { $set: { referrer: referrerId } });

        console.log("Updated the referrals")
        return { message: "Updated the Referrals" }

    } catch (error) {
        return { error: "An error occured while Database operation" }
    }

}


module.exports = referralUpdate;