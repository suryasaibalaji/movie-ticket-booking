import { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        fetch("http://localhost:5000/api/bookings/my-bookings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBookings(data.bookings || []);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    return (
        <div className="bookings-page">
            <h1>My Bookings 🎟️</h1>

            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <div className="booking-list">
                    {bookings.map((booking) => (
                        <div
                            className="booking-card"
                            key={booking._id}
                        >
                            <h2>
                                {booking.show?.movie?.title}
                            </h2>

                            <p>
                                Theatre:{" "}
                                {booking.show?.theatre?.name}
                            </p>

                            <p>
                                Seats:{" "}
                                {booking.seats.join(", ")}
                            </p>

                            <p>
                                Total: ₹{booking.totalAmount}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;