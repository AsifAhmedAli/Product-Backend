const BuyStars = require("../model/BuyStars");
const Salary = require("../model/Salary");
const Stars = require("../model/Stars");

const initializeSchemas = async (MongoUserId) => {
    try {
        // Initialize global stars schema
        await new Stars({
            user_id: MongoUserId
        }).save();

        // Initialize the Salary schema
        await new Salary({
            user_id: MongoUserId
        }).save()

        // Initialize the Bought Stars schema
        await new BuyStars({
            user_id: MongoUserId
        }).save();
    }
    catch (err) {
        throw err;
    }

}

module.exports = initializeSchemas;