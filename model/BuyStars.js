const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const BuyStarsSchema = new Schema({
    boughtStars: {
        type: Number,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    price: {
        type: Number,
    },
    transactionId: {
        type: String,
    }
}, {
    timestamps: true
})

BuyStarsSchema.plugin(diffHistory.plugin)

const BuyStars = mongoose.model('BuyStars', BuyStarsSchema);
module.exports = BuyStars;