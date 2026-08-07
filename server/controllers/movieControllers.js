const Movie = require("../models/Movie");


// Add Movie
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


// Get All Movies
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();

        res.status(200).json({
            success: true,
            count: movies.length,
            movies,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get One Movie
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        res.status(200).json({
            success: true,
            movie,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Update Movie
const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            movie,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete Movie
const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
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
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
};