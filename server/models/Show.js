const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },

        theatre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theatre",
            required: true,
        },

        showTime: {
            type: Date,
            required: true,
        },

        ticketPrice: {
            type: Number,
            required: true,
            min: 1,
        },

        availableSeats: {
            type: [String],
            default: [
                "A1", "A2", "A3", "A4",
                "B1", "B2", "B3", "B4"
            ],
        },

        bookedSeats: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Show", showSchema);