import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

function SeatSelection() {
    const { showId } = useParams();
    const navigate = useNavigate();

    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/shows")
            .then((response) => response.json())
            .then((data) => {
                console.log("Shows received:", data);

                const foundShow = data.shows?.find(
                    (item) => item._id === showId
                );

                if (foundShow) {
                    setShow(foundShow);
                } else {
                    console.log("Show not found:", showId);
                }

                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching show:", error);
                setLoading(false);
            });
    }, [showId]);


    const toggleSeat = (seat) => {
        if (!show.availableSeats.includes(seat)) {
            return;
        }

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(
                selectedSeats.filter(
                    (item) => item !== seat
                )
            );
        } else {
            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    };


    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before booking.");
            navigate("/login");
            return;
        }

        setBooking(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        showId: showId,
                        seats: selectedSeats,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Booking successful! 🎉");
                navigate("/my-bookings");
            } else {
                alert(
                    data.message ||
                    "Booking failed."
                );
            }

        } catch (error) {
            console.log("Booking error:", error);
            alert("Something went wrong.");
        }

        setBooking(false);
    };


    if (loading) {
        return (
            <div className="seat-page">
                <h2>Loading show...</h2>
            </div>
        );
    }


    if (!show) {
        return (
            <div className="seat-page">
                <h2>Show not found 😭</h2>
                <button onClick={() => navigate("/movies")}>
                    Back to Movies
                </button>
            </div>
        );
    }


    const seats = [
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
    ];


    const totalAmount =
        selectedSeats.length * show.ticketPrice;


    return (
        <div className="seat-page">

            <div className="seat-container">

                <h1>{show.movie?.title}</h1>

                <p className="theatre-name">
                    {show.theatre?.name}
                </p>

                <p>
                    Ticket Price: ₹{show.ticketPrice}
                </p>

                <div className="screen">
                    SCREEN
                </div>

                <div className="seats-area">

                    {seats.map((row) => (
                        <div
                            className="seat-row"
                            key={row[0]}
                        >

                            {row.map((seat) => {

                                const available =
                                    show.availableSeats.includes(
                                        seat
                                    );

                                const selected =
                                    selectedSeats.includes(
                                        seat
                                    );

                                return (
                                    <button
                                        key={seat}
                                        className={`seat ${
                                            !available
                                                ? "booked"
                                                : selected
                                                ? "selected"
                                                : ""
                                        }`}
                                        disabled={!available}
                                        onClick={() =>
                                            toggleSeat(seat)
                                        }
                                    >
                                        {seat}
                                    </button>
                                );
                            })}

                        </div>
                    ))}

                </div>


                <div className="legend">

                    <span>
                        <span className="legend-box available-box"></span>
                        Available
                    </span>

                    <span>
                        <span className="legend-box selected-box"></span>
                        Selected
                    </span>

                    <span>
                        <span className="legend-box booked-box"></span>
                        Booked
                    </span>

                </div>


                <div className="booking-summary">

                    <h3>Selected Seats</h3>

                    <p>
                        {selectedSeats.length > 0
                            ? selectedSeats.join(", ")
                            : "No seats selected"}
                    </p>

                    <h3>
                        Total: ₹{totalAmount}
                    </h3>

                    <button
                        className="book-button"
                        onClick={handleBooking}
                        disabled={booking}
                    >
                        {booking
                            ? "Booking..."
                            : "Book Tickets"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default SeatSelection;