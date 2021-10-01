const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    referralLink: {
        type: String,
        required: true
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
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;