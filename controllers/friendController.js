const User = require("../model/User");

const friendController = {

    // get all friends
    getFriends: async (req, res, next) => {
        try {
            // Check if user exists
            const user = await User.exists({ _id: req.user.id });
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            User.findById(req.user.id).populate("friends").exec((err, user) => {
                if (err) {
                    return res.status(400).json({ error: "Error getting friends" });
                } else {
                    return res.status(200).json({ friends: user.friends });
                }
            })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Add a friend
    addFriend: async (req, res) => {
        try {
            let pendingIds, friendIds;
            const { recieverEmail } = req.body;

            if (!recieverEmail) {
                return res.status(400).json({ error: "Please enter a valid Reciever's email" });
            }

            const loggedInUser = await User.findById(req.user.id);
            const reciever = await User.findOne({ email: recieverEmail });

            if (!reciever) {
                return res.status(400).json({ error: "Reciever does not exist" });
            }

            if (reciever._id === loggedInUser._id) {
                return res.status(400).json({ error: "You cannot add yourself as a friend" });
            }

            // Get the pending friend request ids
            if (loggedInUser.pendingFriends.length > 0) {
                pendingIds = new Array(loggedInUser.pendingFriends.length - 1);
                loggedInUser.pendingFriends.forEach(pendingFriend => {
                    pendingIds.push(pendingFriend._id);
                })
            }

            // Get the friends ids
            if (loggedInUser.friends.length > 0) {
                friendIds = new Array(loggedInUser.friends.length - 1);
                loggedInUser.friends.forEach(friend => {
                    friendIds.push(friend._id);
                })
            }

            let conditions = {
                $or: [
                    {
                        $and: [
                            { _id: { $nin: pendingIds } },       // reciever is not in sender's pending friends
                            { _id: { $nin: friendIds } },        // reciever is not in sender's friends
                            { email: reciever.email },
                            { 'pendingFriends._id': { $ne: loggedInUser._id } }, // sender is not in reciever's pending friends
                            { 'friends._id': { $ne: loggedInUser._id } }         // sender is not in reciever's friends
                        ]
                    }
                ]
            }

            let update = {
                $addToSet: {
                    pendingFriends: {
                        _id: loggedInUser._id,
                        name: loggedInUser.name,
                        username: loggedInUser.username,
                        email: loggedInUser.email,
                        contact: loggedInUser.contact
                    }
                }
            }

            User.findOneAndUpdate(conditions, update, (err, user) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Friend request sent successfully"
                    });
                }
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


    },

    // Accept a friend request
    acceptFriend: async (req, res) => {
        try {
            let pendingIds;
            const { id } = req.params;
            const loggedInUser = await User.findById(req.user.id);
            const friend = await User.findById(id);

            // Check if username existsz
            if (id === undefined || id === null) {
                return res.status(400).json({ error: "No user's Id passed" });
            }

            // accepting your own friend request
            if (loggedInUser._id === friend._id) {
                return res.status(400).json({ error: "Why are you accepting you own friend Request" });
            }

            // Check if the friend exists
            if (!friend) {
                return res.status(400).json({ error: "Friend does not exist" });
            }

            // Get the pending friend request ids
            if (loggedInUser.pendingFriends.length > 0) {
                pendingIds = new Array(loggedInUser.pendingFriends.length - 1);
                loggedInUser.pendingFriends.forEach(pendingFriend => {
                    pendingIds.push(pendingFriend._id);
                })
            } else {
                return res.status(400).json({ error: "No pending friend requests" });
            }

            // Check if the friend id is in the pending friends
            for (let i = 0; i < pendingIds.length; i++) {
                if (!pendingIds[i].equals(friend._id)) {
                    return res.status(400).json({ error: "Friend request not available" });
                }
            }

            /*
                remove the friend request from the logged in user's pending friends
                & add the friend to the logged in user's friends
            */
            let conditions = {
                _id: loggedInUser._id
            }

            let update = {
                $pull: {
                    pendingFriends: {
                        _id: friend._id
                    }
                },
                $addToSet: {
                    friends: {
                        _id: friend._id,
                        name: friend.name,
                        username: friend.username,
                        email: friend.email,
                        contact: friend.contact
                    }
                }
            }

            const currentUserFriendAccept = await User.findOneAndUpdate(conditions, update);
            const otherUserFriendAccept = await User.findOneAndUpdate({ _id: friend._id }, {
                $addToSet: {
                    friends: {
                        _id: loggedInUser._id,
                        name: loggedInUser.name,
                        username: loggedInUser.username,
                        email: loggedInUser.email,
                        contact: loggedInUser.contact
                    }
                }
            });

            if (currentUserFriendAccept && otherUserFriendAccept) {
                return res.status(200).json({
                    success: true,
                    message: "Friend request accepted successfully"
                });
            } else {
                return res.status(400).json({ error: "Friend request not accepted" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
}

module.exports = friendController;