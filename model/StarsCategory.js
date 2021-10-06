const mongoose = require('mongoose');
const diffHistory = require('mongoose-diff-history/diffHistory')
const Schema = mongoose.Schema;

const StarsCategorySchema = new Schema({
    subscription: {
        type: Number,
        default: 50000
    },
    regular: {
        type: Number,
        default: 1000
    },
    beginner: {
        type: Number,
        default: 2000
    },
    professional: {
        type: Number,
        default: 3000
    },
    youtubeVideoCompletion: {
        type: Number,
        default: 10000
    },
    adCompletion: {
        type: Number,
        default: 15000
    },
    survey_completion: {
        type: Number,
        default: 7500
    }
}, {
    timestamps: true
})

StarsCategorySchema.plugin(diffHistory.plugin)

const StarsCategory = mongoose.model('StarsCategory', StarsCategorySchema);
module.exports = StarsCategory;