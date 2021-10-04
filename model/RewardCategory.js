const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RewardCategorySchema = new Schema({
    subscription: {
        type: String,
        default: 'subscription'
    },
    youtubeVideoCompletion: {
        type: String,
        default: 'youtubeVideoCompletion'
    },
    adCompletion: {
        type: String,
        default: 'adCompletion'
    }
}, {
    timestamps: true
})

const RewardCategory = mongoose.model('RewardCategory', RewardCategorySchema);
module.exports = RewardCategory;