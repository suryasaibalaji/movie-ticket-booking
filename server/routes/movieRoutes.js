const express = require("express");
const router = express.Router();

const { addMovie } = require("../controllers/movieControllers");

router.post("/", addMovie);

module.exports = router;