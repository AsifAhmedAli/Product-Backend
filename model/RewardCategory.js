const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const RewardCategorySchema = new Schema({
    subscription: {
        type: String,
        default: 'subscription'
    },
    youtube_video_completion: {
        type: String,
        default: 'youtubeVideoCompletion'
    },
    adCompletion: {
        type: String,
        default: 'adCompletion'
    },
    survey_completion: {
        type: String,
        default: 'survey_completion'
    }
}, {
    timestamps: true
})

RewardCategorySchema.plugin(diffHistory.plugin)

const RewardCategory = mongoose.model('RewardCategory', RewardCategorySchema);
module.exports = RewardCategory;