const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    referralLink: {
        type: String,
        required: false
    },
    referralCount: {
        type: Number,
        default: 0
    },
    referrer: {
        type: Schema.Types.ObjectId,
        required: false
    },
    rewards: [{
        type: Schema.Types.ObjectId,
        ref: 'Reward',
    }],
    enabled: {
        type: Boolean,
        default: true
    },
    stars: {
        type: Schema.Types.ObjectId,
        ref: 'Stars',
    },
    boughtStars: {
        type: Schema.Types.ObjectId,
        ref: 'BuyStars',
    },
    salary: {
        type: Schema.Types.ObjectId,
        ref: 'Salary',
    },
    subscription: {
        type: Boolean,
        default: false
    },
    serviceProvider: {
        type: String,
    },
    googleId: {
        type: Number,
    },
    facebookId: {
        type: Number,
    },
    pendingFriends: [this],
    friends: [this]
})

UserSchema.plugin(diffHistory.plugin)
const User = mongoose.model('User', UserSchema);
module.exports = User;