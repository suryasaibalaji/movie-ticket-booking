import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/movies/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data.movie);
            })
            .catch((error) => console.log(error));

        fetch("http://localhost:5000/api/shows")
            .then((response) => response.json())
            .then((data) => {
                const movieShows = (data.shows || []).filter(
                    (show) => show.movie?._id === id
                );

                setShows(movieShows);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (!movie) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="details-page">

            <div className="movie-details">
                <img src={movie.poster} alt={movie.title} />

                <div>
                    <h1>{movie.title}</h1>

                    <p>{movie.description}</p>

                    <p>
                        <strong>Genre:</strong> {movie.genre}
                    </p>

                    <p>
                        <strong>Language:</strong> {movie.language}
                    </p>

                    <p>
                        <strong>Duration:</strong> {movie.duration} minutes
                    </p>
                </div>
            </div>

            <h2>Available Shows</h2>

            <div className="show-list">
                {shows.length === 0 ? (
                    <p>No shows available.</p>
                ) : (
                    shows.map((show) => (
                        <div className="show-card" key={show._id}>
                            <h3>{show.theatre?.name}</h3>

                            <p>{show.theatre?.location}</p>

                            <p>
                                {new Date(show.showTime).toLocaleString()}
                            </p>

                            <p>₹{show.ticketPrice}</p>

                            <a href={`/shows/${show._id}/seats`}>
                             <button>Select Seats</button>
                            </a>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default MovieDetails;