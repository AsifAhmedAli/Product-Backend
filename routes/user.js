const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const validateRegister = require('../validators/register');
const validateLogin = require('../validators/login');
const Token = require('../model/Token');
const crypto = require('crypto');
const router = express.Router();
const emailVerifier = require('../utils/nodemailer');
const jwt = require('jsonwebtoken');


router.post("/signup", async (req, res) => {
    const { name, username, email, contact, password } = req.body;

    // Check if request data is valid
    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
        console.log("There are errors:", errors)
        return res.status(400).json(errors);
    }
    else {
        // Check if user already exists
        User.findOne({ email }).then((user) => {
            if (user) {
                return res.status(400).json({ error: "Email already exists" });
            } else {
                // save to database with encrypted password

                const userData = new User({
                    name,
                    username,
                    email,
                    password,
                    contact
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(userData.password, salt, (err, hash) => {
                        if (err) throw err;
                        userData.password = hash;

                        userData
                            .save()
                            .then((user) => {
                                const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                                token.save(async (err, data) => {
                                    if (err) {
                                        return res.status(400).json({ error: "Error saving token" });
                                    }
                                    // Send email (use credintials of SendGrid)
                                    emailVerifier(user, token, req);
                                })
                                return res.status(200).json({ message: "User created successfully" });
                            })
                            .catch(() => {
                                return res.status(500).json({ error: "Error creating user" });
                            });
                    });
                });
            }
        });
    }
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // Check if request data is valid
    const { errors, isValid } = validateLogin(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "Email not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user._id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 604800 // 1 week in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ error: "Password incorrect" });
            }
        });
    });

})

module.exports = router;