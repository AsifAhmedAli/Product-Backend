const User = require('../model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validateRegister = require('../validators/register');
const validateLogin = require('../validators/login');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const referralUpdate = require('../helpers/referralUpdate');
const initializeSchemas = require('../db/initializeSchemas');
const RefreshToken = require('../model/RefreshToken');
const sendVerificationEmail = require('../helpers/verificationEmail');
const EmailUrl = require('../model/EmailUrl');

const userControllers = {
    me: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const userData = await User.findById(user.id)
            userData.password = undefined;
            return res.json({ userData });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    signup: async (req, res) => {
        const { username, email, contact, password, confirmPassword } = req.body;

        // if request data is valid
        const { errors, isValid } = validateRegister(req.body);

        if (!isValid) {
            return res.status(400).json({ errors });
        }

        try {
            // if user already exists
            User.findOne({ email }).then(async (user) => {
                if (user) {
                    return res.status(400).json({ error: "Email already exists" });
                } else {
                    const MongoUserId = mongoose.Types.ObjectId();
                    const userData = await new User({
                        _id: MongoUserId,
                        username,
                        email: email.toLowerCase(),
                        password,
                        contact,
                        role: "User",
                        referralLink: `http://localhost:5000/user/signup?referrer=${MongoUserId}`,
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(userData.password, salt, async (err, hash) => {
                            if (err) throw err;

                            userData.password = hash;
                            const ifSaved = await userData.save();

                            // Initialize Related Schemas
                            await initializeSchemas(MongoUserId);

                            if (ifSaved) {
                                // Check if referral link is present
                                if (req.query.referrer) {
                                    const referrerCountIncrement = await referralUpdate(req.query.referrer, MongoUserId);

                                    if (!referrerCountIncrement) {
                                        return res.status(404).json({ error: "Referrer not found" });
                                    }
                                }

                                // // Send verification email
                                // sendVerificationEmail({ ...ifSaved, password: null }, (err, info) => {
                                //     if (err) throw err;
                                // });

                                return res.status(200).json({ message: "Registration Successful, Please verify your email" });
                            }

                            return res.status(400).json({ error: "Error creating user" });
                        });
                    });
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },


    signin: async (req, res) => {
        const { email, password } = req.body;

        // Check if request data is valid
        const { errors, isValid } = validateLogin(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        try {
            const user = await User.findOne({ email });

            // Check if user exists
            if (!user) {
                return res.status(404).json({ error: "Email not found" });
            }

            // Check if blocked
            if (!user.enabled) {
                return res.status(400).json({ error: "User is blocked, Contact Administration" });
            }

            // // Check if not verified (Verification is done via email)
            // if (!user.verified) {
            //     return res.status(400).json({ error: "User is not verified" });
            // }

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                user.password = null;

                // Create JWT Payload
                const payload = {
                    id: user._id,
                    role: user.role
                };

                // Sign token
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRATION}` });
                if (!token) {
                    return res.status(500).json({ error: "Error signing token" });
                }
                // Save refresh token
                const refreshToken = await RefreshToken.createToken(user);

                return res.cookie('jwt_tokens', { token, refreshToken }, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION * 1000)
                }).status(200).json({
                    message: "Login Successful"
                });

            } else {
                return res.status(400).json({ error: "Password incorrect" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    verifyUserEmail: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "Email not Registered" });
            }

            if (user.verified) {
                return res.status(400).json({ error: "User is already verified" });
            }

            user.verified = true;
            const ifSaved = await user.save();


            if (ifSaved) {
                return res.status(200).json({ message: "User verified successfully" });
            }

            return res.status(400).json({ error: "Error verifying user" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    logout: (req, res) => {
        return res
            .clearCookie("jwt_tokens")
            .status(200)
            .json({ message: "Successfully logged out 😏 🍀" });
    }
}

module.exports = userControllers;