const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./db/mongodb');
const runCronSchedule = require('./lib/cronjob');
const apicache = require("apicache");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const cache = apicache.middleware;

// Middlewares
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: [
        `${process.env.FRONT_URL}`,
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(cookieParser());
app.set('trust proxy', 1);       // For reverse proxy servers
// app.use(cache('30 seconds'))

// Connect to Database
connectDB();

// Routes
app.use("/user", require("./routes/user"));
app.use("/other", require("./routes/other"));
app.use("/subscription", require("./routes/subscription"));
app.use("/stars", require("./routes/stars"));
app.use("/reward", require("./routes/reward"));
app.use("/payment/easypaysa", require("./routes/payment/easypaysa"));
app.use("/youtube", require("./routes/youtube"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/survey", require("./routes/survey"));
app.use("/auth/google", require("./routes/googleAuth"));
app.use("/auth/facebook", require("./routes/facebookAuth"));
app.use("/friend", require("./routes/friend"));
app.use('/token/refresh', require('./routes/refreshtoken'));
app.use('/email/verify', require('./routes/email'));



// Run cron-job
// runCronSchedule()

// If no route is matched, return 404
app.use("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Page not found"
    });
})

// Error middleware
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({
        success: false,
        error: message,
        data: data
    });
})


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})