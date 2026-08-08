const Booking = require("../models/Booking");
const Show = require("../models/Show");

const createBooking = async (req, res) => {
    try {
        const { showId, seats } = req.body;

        if (!showId || !seats || seats.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide show and seats",
            });
        }

        const show = await Show.findById(showId);

        if (!show) {
            return res.status(404).json({
                success: false,
                message: "Show not found",
            });
        }

        const alreadyBooked = seats.some(
            (seat) => !show.availableSeats.includes(seat)
        );

        if (alreadyBooked) {
            return res.status(400).json({
                success: false,
                message: "One or more seats are already booked",
            });
        }

        show.availableSeats = show.availableSeats.filter(
            (seat) => !seats.includes(seat)
        );

        show.bookedSeats.push(...seats);

        await show.save();

        const totalAmount = seats.length * show.ticketPrice;

        const booking = await Booking.create({
            user: req.user.id,
            show: showId,
            seats,
            totalAmount,
        });

        res.status(201).json({
            success: true,
            message: "Booking successful",
            booking,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user.id,
        })
            .populate({
                path: "show",
                populate: [
                    {
                        path: "movie",
                    },
                    {
                        path: "theatre",
                    },
                ],
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createBooking,
    getMyBookings,
};