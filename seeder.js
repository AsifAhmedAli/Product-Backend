const User = require('./model/User')
const Stars = require('./model/Stars')
const Reward = require('./model/Reward')
const BuyStars = require('./model/BuyStars')
const Salary = require('./model/Salary')
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Database Connected");
    }).catch(err => {
        console.log("Error connecting to Database");
    });

    const dropDB = async () => {
        await mongoose.connection?.db?.dropDatabase();
    }

    // Drop Database
    await dropDB();

})()

