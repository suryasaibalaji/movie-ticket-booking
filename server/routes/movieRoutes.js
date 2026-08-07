const express = require("express");

const router = express.Router();

const {
    addMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} = require("../controllers/movieControllers");


// POST - Add Movie
router.post("/", addMovie);


// GET - All Movies
router.get("/", getMovies);


// GET - One Movie
router.get("/:id", getMovieById);


// PUT - Update Movie
router.put("/:id", updateMovie);


// DELETE - Delete Movie
router.delete("/:id", deleteMovie);


module.exports = router;