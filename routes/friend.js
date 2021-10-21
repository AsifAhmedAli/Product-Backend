const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Friend');
})

// Send friend request
router.post('/request/send', (req, res) => {

})


module.exports = router;