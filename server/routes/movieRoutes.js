const express = require("express");

const router = express.Router();

const {
    addMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} = require("../controllers/movieControllers");

const protect = require("../middleware/authMiddleware");

router.post("/", addMovie);

router.get("/", getMovies);

router.get("/:id", protect, getMovieById);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = router;