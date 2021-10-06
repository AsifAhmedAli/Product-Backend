const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diffHistory = require('mongoose-diff-history/diffHistory')

const SalarySchema = new Schema({
    amount: {
        type: Number,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
})

SalarySchema.plugin(diffHistory.plugin)

const Salary = mongoose.model('Salary', SalarySchema);
module.exports = Salary;