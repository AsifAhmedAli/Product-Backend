const { addReward, addCustomReward } = require("../helpers/rewardHelpers");
const Stars = require("../model/Stars");
const Survey = require("../model/Survey");
const User = require("../model/User");

const surveyController = {
    addSurvey: async (req, res) => {

        const { starsRequired, starsReward } = req.body;

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

        const { title, description } = req.body;

        const newSurvey = await new Survey({
            title,
            description,
            starsRequired,
            starsReward
        });

        for (let i = 0; i < mcqsFrontend.length; i++) {
            await newSurvey.mcqs.push(mcqsFrontend[i]);
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
            // Answers submitted by user
            const mcqsFrontend = [1, 7, 5]

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

            if (mcqsFrontend.length <= 0) {
                return res.status(400).json({ error: "Please answer some questions" });
            }

            const alreadySubmitted = foundSurvey.responses.find(elem => {
                return elem.user.equals(foundUser._id);
            });

            // Check if the user has already submitted the survey
            if (alreadySubmitted) {
                return res.status(400).json({ error: "You have already submitted this survey" });
            }

            // Add the user's response to the survey and update the user's stars
            foundSurvey.responses.push({ user: userID, answers: mcqsFrontend });

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