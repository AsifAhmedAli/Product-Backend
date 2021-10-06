const User = require('../model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validateRegister = require('../validators/register');
const validateLogin = require('../validators/login');
const Token = require('../model/Token');
const crypto = require('crypto');
const emailVerifier = require('../utils/nodemailer');
const jwt = require('jsonwebtoken');
const referralUpdate = require('../helpers/referralUpdate');
const initializeSchemas = require('../helpers/initializeSchemas');

const userControllers = {
    signup: async (req, res) => {
        const { name, username, email, contact, password } = req.body;

        // if request data is valid
        const { errors, isValid } = validateRegister(req.body);

        if (!isValid) {
            console.log("There are errors:", errors)
            return res.status(400).json(errors);
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
                        name,
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

                                // const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                                // token.save(async (err, data) => {
                                //     if (err) {
                                //         return res.status(400).json({ error: "Error saving token" });
                                //     }
                                //     // Send email (use credentials of SendGrid)
                                //     emailVerifier(user, token, req);
                                // })
                                return res.status(200).json({ message: "User created successfully" });
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
                return res.status(400).json({ error: "User is blocked" });
            }

            const isMatch = await bcrypt.compare(password, user.password);


            if (isMatch) {

                user.password = null;

                // Create JWT Payload
                const payload = {
                    id: user._id,
                    role: user.role
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 604800 // 1 week in seconds
                    },
                    (err, token) => {
                        res.status(200).json({
                            user,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ error: "Password incorrect" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = userControllers;