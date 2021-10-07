const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// survey model
const surveySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mcqs: [
        {
            question: {
                type: String,
                unqiue: true,
            },
            options: [String]
        }
    ],
    responses: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            mcqAnswers: [Number],
            radioAnswers: [Number],
            checkboxAnswers: [Number],
            fillBlankAnswer: String,
            trueFalseAnswers: [Number],
        }
    ],
    starsRequired: {
        type: Number,
        default: 0
    },
    starsReward: {
        type: Number,
        default: 0
    },
    radioQuestions: [
        {
            title: {
                type: String,
                required: true
            },
            options: [String],

        }
    ],
    checkboxes: {
        title: {
            type: String,
        },
        options: [String],
    },
    fillBlank: {
        title: {
            type: String,
        }
    },
    trueFalse: [
        {
            title: {
                type: String,
            },
            options: [String]
        }
    ]
})

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;