const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const RewardSchema = new Schema({
    stars: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

RewardSchema.plugin(diffHistory.plugin)

const Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;