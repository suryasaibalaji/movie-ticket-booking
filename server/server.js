const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");
const showRoutes = require("./routes/showRoutes");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/theatres", theatreRoutes);
app.use("/api/shows", showRoutes);

// Connect Database
connectDB();


// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT} at ${new Date().toLocaleString()}`
    );
});