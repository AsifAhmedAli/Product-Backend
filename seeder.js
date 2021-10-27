const User = require('./model/User')
const Stars = require('./model/Stars')
const Reward = require('./model/Reward')
const BuyStars = require('./model/BuyStars')
const Salary = require('./model/Salary')
const mongoose = require("mongoose");
const RewardCategory = require('./model/RewardCategory')
const StarsCategory = require('./model/StarsCategory')
require("dotenv").config();

(async () => {
    const args = process.argv[2];
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Database Connected");
    }).catch(err => {
        console.log("Error connecting to Database");
    });

    const dropDB = async () => {
        await mongoose.connection?.db?.dropDatabase();
    }

    const createCategories = async () => {
        await new RewardCategory({}).save();
        await new StarsCategory({}).save();
    }

    // Drop Database

    if (args === "drop") {
        await dropDB();
    }

    if (args === 'categories') {
        await createCategories();
    }

})()

