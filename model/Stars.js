const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const StarsSchema = new Schema({
    currentStars: {
        type: Number,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

}, {
    timestamps: true
})

StarsSchema.plugin(diffHistory.plugin)

const Stars = mongoose.model('Stars', StarsSchema);
module.exports = Stars;