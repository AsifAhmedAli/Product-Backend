const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require('../model/User');
const querystring = require("querystring");
const initializeSchemas = require('../helpers/initializeSchemas');

const REDIRECT_URI = "auth/google";
const SERVER_URI = `http://localhost:${process.env.PORT}`;

// @desc    auth/google/url
// @route   GET

// Get Google Login URL
router.get("/url", async (req, res) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${SERVER_URI}/${REDIRECT_URI}`,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    res.send(`${rootUrl}?${querystring.stringify(options)}`);
})

function getTokens({ code, clientId, clientSecret, redirectUri, }) {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    return axios
        .post(url, querystring.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => res.data)
        .catch((error) => {
            console.error(`Failed to fetch auth tokens`);
            throw new Error(error.message);
        });
}

// @desc    auth/google/
// @route   GET

router.get("/", async (req, res) => {
    try {
        const { code } = req.query; // code from service provider which is appended to the frontend's URL

        const { id_token, access_token } = await getTokens({
            code,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: `${SERVER_URI}/${REDIRECT_URI}`,
        });

        // Fetch the user's profile with the access token and bearer
        const googleUser = await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${id_token}`,
                    },
                }
            )
            .then((res) => res.data)
            .catch((error) => {
                console.error(`Failed to fetch user`);
                throw new Error(error.message);
            });

        const body = {
            googleId: googleUser.id,
            username: googleUser.name,
            email: googleUser.email,
            password: " ",
            name: googleUser.name,
            role: "User",
            serviceProvider: 'google',
        };

        const user = await User.findOne({ email: body.email });

        if (!user) {
            const createdUser = await User.create(body)         // store User to database
            await initializeSchemas(createdUser._id);           // Initialize Related Schemas

            const payload = {
                id: createdUser._id,
                role: createdUser.role
            };

            const ourOwnToken = jwt.sign(payload, process.env.JWT_SECRET) // create token with the user's Id and Role

            return res.status(200).json({
                success: true,
                token: ourOwnToken
            });
        }
        else {
            const payload = {
                id: user._id,
                role: user.role
            };

            const ourOwnToken = jwt.sign(payload, process.env.JWT_SECRET) // create token with the user's Id and Role

            return res.status(200).json({
                success: true,
                token: ourOwnToken
            });
        }



    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
})

module.exports = router;