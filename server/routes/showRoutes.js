const express = require("express");

const router = express.Router();

const {
    addShow,
    getShows,
} = require("../controllers/showController");


router.post("/", addShow);

router.get("/", getShows);


module.exports = router;