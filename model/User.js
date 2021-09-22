const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
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
        type: String,
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;