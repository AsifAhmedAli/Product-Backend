const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Reward = mongoose.model('Reward', RewardSchema);
module.exports = Reward;