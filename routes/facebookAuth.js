const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require('../model/User');
const querystring = require("querystring");
const initializeSchemas = require('../db/initializeSchemas');

const REDIRECT_URI = "auth/facebook";
const SERVER_URI = `http://localhost:${process.env.PORT}`;

// @desc    auth/facebook/url
// @route   GET

// Get Google Login URL
router.get("/url", async (req, res) => {
    const rootUrl = "https://www.facebook.com/v4.0/dialog/oauth";

    const stringifiedParams = querystring.stringify({
        client_id: process.env.FACEBOOK_APP_ID,
        redirect_uri: `${SERVER_URI}/${REDIRECT_URI}`,
        scope: ['email', 'user_friends'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    res.send(`${rootUrl}?${stringifiedParams}`);
})

// Get ACCESS Token
async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: 'https://graph.facebook.com/v4.0/oauth/access_token',
        method: 'get',
        params: {
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            redirect_uri: `${SERVER_URI}/${REDIRECT_URI}`,
            code,
        },
    });
    return data.access_token;
};

// @desc    auth/facebook
// @route   GET

router.get("/", async (req, res) => {
    const { code } = req.query;
    try {
        const access_token = await getAccessTokenFromCode(code);
        const { data: profile } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['id', 'email', 'first_name', 'last_name', 'name', 'birthday'].join(','),
                access_token,
            },
        });

        const { data: fbFriends } = await axios({
            url: 'https://graph.facebook.com/me/friends',
            method: 'get',
            params: {
                access_token,
            },
        });

        console.log("Person Data: ", profile);
        console.log("Person Friends: ", fbFriends);

        const body = {
            facebookId: profile.id,
            username: profile.first_name,
            email: profile.email,
            password: " ",
            name: profile.name,
            role: "User",
            serviceProvider: 'facebook',
        };

        const user = await User.findOne({ email: body.email });

        if (!user) {
            const createdUser = await User.create(body)         // store User to database
            initializeSchemas(createdUser._id);           // Initialize Related Schemas

            const payload = {
                id: createdUser._id,
                role: createdUser.role,
                facebookId: createdUser.facebookId
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
                role: user.role,
                facebookId: user.facebookId
            };

            const ourOwnToken = jwt.sign(payload, process.env.JWT_SECRET) // create token with the user's Id and Role

            return res.status(200).json({
                success: true,
                token: ourOwnToken
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;