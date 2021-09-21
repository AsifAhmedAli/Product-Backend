const mongoose = require('mongoose');

// Database connection
function connectDB() {
    mongoose.connect(
        `${process.env.MONGO_URI}`,
        { useUnifiedTopology: true, useNewUrlParser: true },
        (err) => {
            if (!err) {
                console.log("Database connected");
            } else {
                console.log("Error connecting to database");
            }
        }
    );
}

module.exports = connectDB;