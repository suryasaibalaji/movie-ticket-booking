import { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadBookings = () => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetch(
            "http://localhost:5000/api/bookings/my-bookings",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setBookings(data.bookings || []);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error:", error);
                setLoading(false);
            });
    };


    useEffect(() => {
        loadBookings();
    }, []);


    const cancelBooking = async (bookingId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `http://localhost:5000/api/bookings/${bookingId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("Booking cancelled successfully ✅");

                // Refresh bookings
                loadBookings();

            } else {

                alert(
                    data.message ||
                    "Could not cancel booking."
                );

            }

        } catch (error) {

            console.log("Cancel error:", error);

            alert("Something went wrong.");

        }
    };


    if (loading) {
        return (
            <div className="bookings-page">
                <h2>Loading bookings...</h2>
            </div>
        );
    }


    return (
        <div className="bookings-page">

            <h1>
                My Bookings 🎟️
            </h1>


            {bookings.length === 0 ? (

                <div className="no-bookings">
                    <p>No bookings yet.</p>
                </div>

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
                                Location:{" "}
                                {booking.show?.theatre?.location}
                            </p>

                            <p>
                                Seats:{" "}
                                {booking.seats.join(", ")}
                            </p>

                            <p>
                                Total: ₹
                                {booking.totalAmount}
                            </p>


                            <button
                                className="cancel-button"
                                onClick={() =>
                                    cancelBooking(
                                        booking._id
                                    )
                                }
                            >
                                Cancel Booking
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyBookings;