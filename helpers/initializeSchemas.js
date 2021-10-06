const BuyStars = require("../model/BuyStars");
const Salary = require("../model/Salary");
const Stars = require("../model/Stars");
const User = require("../model/User");

const initializeSchemas = async (MongoUserId) => {
    try {
        // Initialize global stars schema
        const stars = await new Stars({
            user_id: MongoUserId
        }).save();

        // Initialize the Salary schema
        const salary = await new Salary({
            user_id: MongoUserId
        }).save()

        // Initialize the Bought Stars schema
        const boughtStars = await new BuyStars({
            user_id: MongoUserId
        }).save();

        User.findById(MongoUserId).then(user => {
            user.stars = stars;
            user.salary = salary;
            user.boughtStars = boughtStars;
            user.save();
        }).catch(err => {
            throw err.message;
        })
    }
    catch (err) {
        throw err;
    }

}

module.exports = initializeSchemas;