const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} at ${new Date().toLocaleString()}`);
});