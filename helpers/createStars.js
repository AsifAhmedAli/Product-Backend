const mongoose = require('mongoose');
const Stars = require('../model/Stars');

const createStars = async () => {
    const Star = new Stars({
        currentStars: 12304,
        user_id: "614d9c21a1f72359ad5c0d85"
    })

    const res = await Star.save();
    console.log("star saved", res);
}

module.exports = createStars;