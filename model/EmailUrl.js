const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// custom url schema
const EmailUrlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
})

const EmailUrl = mongoose.model('EmailUrl', EmailUrlSchema);
module.exports = EmailUrl;