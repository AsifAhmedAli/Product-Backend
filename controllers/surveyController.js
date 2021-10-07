const { addReward, addCustomReward } = require("../helpers/rewardHelpers");
const Stars = require("../model/Stars");
const Survey = require("../model/Survey");
const User = require("../model/User");

const surveyController = {
    addSurvey: async (req, res) => {

        const { title, description, starsRequired, starsReward } = req.body;

        // Only admin can add survey
        const mcqsFrontend = [
            {
                question: "Is your name complete ?",
                options: ["Agree", "Totally agree", "Neutral", "Disagree", "Totally disagree"]
            },
            {
                question: "What in the beautiful universe ?",
                options: ["Yes", "Total Yes", "Neutral", "No", "Not no"]
            },
            {
                question: "Is this right englush ?",
                options: ["Something", "Taken", "Too", "Much", "Granted"]
            },
        ]

        const radioQuestions = [
            {
                title: "What is your favorite color ?",
                options: ["Red", "Blue", "Green", "Yellow", "Black"]
            },
            {
                title: "What is your favorite animal ?",
                options: ["Dog", "Cat", "Lion", "Tiger", "Elephant"]
            }
        ]

        const checkboxes = {
            title: "What do you want to play",
            options: ["Football", "Cricket", "Tennis", "Badminton", "Basketball"]
        }

        const fillBlank = {
            title: "What is your name ?",
            answer: ""
        }

        const trueFalse = [
            {
                title: "Is this true ?",
                options: ["True", "False"]
            },
            {
                title: "Is this false ?",
                options: ["True", "False"]
            }
        ]

        const newSurvey = await new Survey({
            title,
            description,
            starsRequired,
            starsReward,
            checkboxes,
            fillBlank,
            trueFalse
        });

        if (mcqsFrontend) {
            for (let i = 0; i < mcqsFrontend.length; i++) {
                await newSurvey.mcqs.push(mcqsFrontend[i]);
            }
        }

        if (radioQuestions) {
            for (let i = 0; i < radioQuestions.length; i++) {
                await newSurvey.radioQuestions.push(radioQuestions[i]);
            }
        }

        newSurvey.save((err, survey) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).json(survey);
            }
        });
    },

    submitSurvey: async (req, res) => {

        try {
            // const { mcqsAnswers, radioAnswers, checkboxAnswers, fillBlankAnswer, trueFalseAnswers } = req.body;
            // Answers submitted by user
            const mcqsAnswers = [1, 7, 2];
            const radioAnswers = [1, 2];
            const checkboxAnswers = [1, 2];
            const fillBlankAnswer = "something";
            const trueFalseAnswers = [1, 2];

            const userID = req.user.id;
            const { surveyID } = req.params;

            // Find the survey
            const foundSurvey = await Survey.findById(surveyID);

            // Get the user
            const foundUser = await User.findById(userID);

            // Check if the user has enough stars
            const userStars = await Stars.findOne({ user_id: userID });

            if (!foundUser) {
                return res.status(400).send("User not found");
            }

            if (userStars.currentStars < foundSurvey.starsRequired) {
                return res.status(400).json({ error: "Not enough stars" });
            }

            if (!foundSurvey) {
                return res.status(404).json({ error: "Survey not found" });
            }

            // // If some fields are not in the survey then mark them empty
            // typeof (mcqsAnswers) === undefined ? mcqsAnswers = [] : mcqsAnswers;
            // typeof (radioAnswers) === undefined ? radioAnswers = [] : radioAnswers;
            // typeof (checkboxAnswers) === undefined ? checkboxAnswers = [] : checkboxAnswers;
            // typeof (fillBlankAnswer) === undefined ? fillBlankAnswer = "" : fillBlankAnswer;
            // typeof (trueFalseAnswers) === undefined ? trueFalseAnswers = [] : trueFalseAnswers;

            if ((typeof (mcqsAnswers) !== "undefined" && mcqsAnswers.length !== foundSurvey.mcqs.length) ||
                (typeof (radioAnswers) !== "undefined" && radioAnswers.length !== foundSurvey.radioQuestions.length) ||
                (typeof (checkboxAnswers) !== "undefined" && checkboxAnswers.length <= 0) ||
                (typeof (fillBlankAnswer) !== "undefined" && fillBlankAnswer === "") ||
                (typeof (trueFalseAnswers) !== "undefined" && trueFalseAnswers.length !== foundSurvey.trueFalse.length)) {
                return res.status(400).json({ error: "Survey not completed" });
            }

            // Check if the user has already submitted the survey
            const alreadySubmitted = foundSurvey.responses.find(elem => {
                return elem.user.equals(foundUser._id);
            });

            if (alreadySubmitted) {
                return res.status(400).json({ error: "You have already submitted this survey" });
            }

            // Add the user's response to the survey and update the user's stars
            foundSurvey.responses.push({
                user: userID,
                mcqAnswers: mcqsAnswers || [],
                radioAnswers: radioAnswers || [],
                checkboxAnswers: checkboxAnswers || [],
                fillBlankAnswer: fillBlankAnswer || "",
                trueFalseAnswers: trueFalseAnswers || []
            });

            userStars.currentStars -= foundSurvey.starsRequired;
            await userStars.save();

            foundSurvey.save((err, survey) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                } else {
                    // Give reward stars to the user
                    addCustomReward(foundUser, "survey_completion", foundSurvey.starsReward);
                    return res.status(200).json(survey);
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}

module.exports = surveyController;