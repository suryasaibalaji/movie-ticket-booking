import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const token = localStorage.getItem("token");

                // Get movie details
                const movieResponse = await fetch(
                    `http://localhost:5000/api/movies/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const movieData = await movieResponse.json();

                console.log("Movie:", movieData);

                if (movieData.success) {
                    setMovie(movieData.movie);
                }

                // Get shows
                const showsResponse = await fetch(
                    "http://localhost:5000/api/shows"
                );

                const showsData = await showsResponse.json();

                console.log("Shows:", showsData);

                const allShows = showsData.shows || [];

                // Find shows belonging to this movie
                const movieShows = allShows.filter(
                    (show) =>
                        show.movie &&
                        show.movie._id === id
                );

                setShows(movieShows);

                setLoading(false);

            } catch (error) {
                console.error("Error loading movie:", error);
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);


    if (loading) {
        return (
            <div className="details-page">
                <h2>Loading movie...</h2>
            </div>
        );
    }


    if (!movie) {
        return (
            <div className="details-page">
                <h2>Movie not found</h2>

                <Link to="/movies">
                    <button>Back to Movies</button>
                </Link>
            </div>
        );
    }


    return (
        <div className="details-page">

            {/* MOVIE INFORMATION */}

            <div className="movie-details">

                <img
                    src={movie.poster}
                    alt={movie.title}
                />

                <div className="movie-info">

                    <h1>{movie.title}</h1>

                    <p>
                        {movie.description}
                    </p>

                    <p>
                        <strong>Genre:</strong>{" "}
                        {movie.genre}
                    </p>

                    <p>
                        <strong>Language:</strong>{" "}
                        {movie.language}
                    </p>

                    <p>
                        <strong>Duration:</strong>{" "}
                        {movie.duration} minutes
                    </p>

                </div>

            </div>


            {/* SHOWS */}

            <div className="shows-section">

                <h2>Available Shows</h2>

                {shows.length === 0 ? (

                    <div className="no-shows">
                        <p>No shows available for this movie.</p>
                    </div>

                ) : (

                    <div className="show-list">

                        {shows.map((show) => (

                            <div
                                className="show-card"
                                key={show._id}
                            >

                                <h3>
                                    {show.theatre?.name}
                                </h3>

                                <p>
                                    📍 {show.theatre?.location}
                                </p>

                                <p>
                                    🕐{" "}
                                    {new Date(
                                        show.showTime
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    🎟️ ₹{show.ticketPrice}
                                </p>

                                <p>
                                    💺{" "}
                                    {show.availableSeats?.length || 0}
                                    {" "}seats available
                                </p>

                                <Link
                                    to={`/shows/${show._id}/seats`}
                                >
                                    <button className="seat-button">
                                        Select Seats 🎟️
                                    </button>
                                </Link>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MovieDetails;