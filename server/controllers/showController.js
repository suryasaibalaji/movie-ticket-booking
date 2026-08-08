const Show = require("../models/Show");


// Add Show
const addShow = async (req, res) => {
    try {
        const show = await Show.create(req.body);

        res.status(201).json({
            success: true,
            message: "Show added successfully",
            show,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get All Shows
const getShows = async (req, res) => {
    try {
        const shows = await Show.find()
            .populate("movie")
            .populate("theatre");

        res.status(200).json({
            success: true,
            shows,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    addShow,
    getShows,
};