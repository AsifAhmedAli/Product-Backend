const User = require('../../model/User');
const getLocation = require('../../lib/location');

const dashboardUserController = {
    getUsers: async (req, res) => {
        getLocation(req.ip);

        try {
            const allUsers = await User.find({});

            // Total Count of users Registered
            const countUsers = await User.countDocuments({});

            return res.status(200).json({
                users: allUsers,
                totalCount: countUsers
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);

            return res.status(200).json(user);

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
            const user = await User.findById(req.params.id);
            if (user.role === 'Admin') {
                return res.status(400).json({ message: "User already Admin" });
            }
            user.role = 'Admin';
            await user.save();
            return res.status(200).json({ message: `${user.name} is now an Admin` });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    removeAdmin: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user.role !== 'Admin') {
                return res.status(400).json({ message: "User is not an Admin" });
            }
            user.role = 'User';
            await user.save();
            return res.status(200).json({ message: `${user.name} is removed as Admin` });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = dashboardUserController