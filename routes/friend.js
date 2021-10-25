const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const { verifyToken } = require('../middlewares/jwtVerifyToken');

router.get('/', verifyToken, friendController.getFriends)

// Send friend request
router.post('/add', verifyToken, friendController.addFriend)
router.post('/accept/:id', verifyToken, friendController.acceptFriend)


module.exports = router;