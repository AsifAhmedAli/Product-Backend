const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const PriceSchema = new Schema({
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
}, {
    timestamps: true
})

PriceSchema.plugin(diffHistory.plugin)

const Price = mongoose.model('Price', PriceSchema);
module.exports = Price;