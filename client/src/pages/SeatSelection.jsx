import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SeatSelection.css";

function SeatSelection() {
    const { showId } = useParams();

    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const allSeats = [
        "A1", "A2", "A3", "A4",
        "B1", "B2", "B3", "B4"
    ];

    useEffect(() => {
        fetch("http://localhost:5000/api/shows")
            .then((response) => response.json())
            .then((data) => {
                const foundShow = (data.shows || []).find(
                    (item) => item._id === showId
                );

                setShow(foundShow);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, [showId]);

    const selectSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(
                selectedSeats.filter((item) => item !== seat)
            );
        } else {
            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    };

    const handleBooking = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat");
            return;
        }

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

                setSelectedSeats([]);

                window.location.reload();
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("Booking Error:", error);
            alert("Booking failed");
        }
    };

    if (!show) {
        return (
            <div className="seat-page">
                <h2>Loading show...</h2>
            </div>
        );
    }

    const totalAmount =
        selectedSeats.length * show.ticketPrice;

    return (
        <div className="seat-page">

            <h1>Select Your Seats 🎟️</h1>

            <p>
                {show.movie?.title} • {show.theatre?.name}
            </p>

            <p>
                Ticket Price: ₹{show.ticketPrice}
            </p>

            <div className="screen">
                SCREEN
            </div>

            <div className="seats">

                {allSeats.map((seat) => {

                    const isBooked =
                        show.bookedSeats.includes(seat);

                    const isSelected =
                        selectedSeats.includes(seat);

                    return (
                        <button
                            key={seat}
                            disabled={isBooked}
                            onClick={() => selectSeat(seat)}
                            className={
                                isBooked
                                    ? "seat booked"
                                    : isSelected
                                    ? "seat selected"
                                    : "seat"
                            }
                        >
                            {seat}
                        </button>
                    );
                })}

            </div>

            <div className="booking-summary">

                <h2>Booking Summary</h2>

                <p>
                    Selected Seats:{" "}
                    {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "None"}
                </p>

                <h3>
                    Total Amount: ₹{totalAmount}
                </h3>

                <button
                    className="book-btn"
                    disabled={selectedSeats.length === 0}
                    onClick={handleBooking}
                >
                    Book Tickets
                </button>

            </div>

        </div>
    );
}

export default SeatSelection;