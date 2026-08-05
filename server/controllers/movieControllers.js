const Movie = require("../models/Movie");

const addMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);

        res.status(201).json({
            success: true,
            message: "Movie added successfully",
            movie,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addMovie,
};