const User = require('../model/User');
const geoip = require('geoip-lite');

const dashboardController = {
    getUsers: async (req, res) => {

        var geo = geoip.lookup(req.ip);
        console.log("Location", geo);

        try {
            const allUsers = await User.find({});
            return res.status(200).json(allUsers);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    disableUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user.enabled) {
                return res.status(200).json({ message: "User already blocked" });
            }
            user.enabled = false;
            await user.save();
            return res.status(200).json({ message: `${user.name} blocked` });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    enableUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user.enabled) {
                return res.status(200).json({ message: "User already enabled" });
            }
            user.enabled = true;
            await user.save();
            return res.status(200).json({ message: `${user.name} unblocked` });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    makeAdmin: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { role: 'Admin' } });
            if (user.role === 'Admin') {
                return res.status(400).json({ message: "User already Admin" });
            }
            return res.status(200).json({ message: `${user.name} is now ad Admin` });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    removeAdmin: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { role: 'User' } });
            if (user.role !== 'Admin') {
                return res.status(400).json({ message: "User is not an Admin" });
            }
            return res.status(200).json({ message: `${user.name} is removed as Admin` });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = dashboardController