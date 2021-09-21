const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./db/mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
dotenv.config();
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/user", require("./routes/user"));
app.use("/other", require("./routes/other"));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})