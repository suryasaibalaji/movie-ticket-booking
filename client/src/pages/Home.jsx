import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.movies || []);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching movies:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-page">

            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Book Your Movie Tickets</h1>

                    <p>
                        Find your favourite movies and book your
                        seats easily.
                    </p>

                    <Link to="/movies">
                        <button className="hero-button">
                            Browse Movies
                        </button>
                    </Link>
                </div>
            </section>


            {/* MOVIES SECTION */}
            <section className="popular-section">

                <h2>Popular Movies</h2>

                {loading ? (
                    <p>Loading movies...</p>
                ) : movies.length === 0 ? (
                    <p>No movies available.</p>
                ) : (

                    <div className="movie-grid">

                        {movies.map((movie) => (

                            <div
                                className="movie-card"
                                key={movie._id}
                            >

                                {/* POSTER */}
                                {movie.poster ? (
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                ) : (
                                    <div className="poster-placeholder">
                                        🎬
                                    </div>
                                )}

                                <div className="movie-info">

                                    <h3>{movie.title}</h3>

                                    <p>
                                        {movie.genre} •{" "}
                                        {movie.language}
                                    </p>

                                    <p className="movie-duration">
                                        {movie.duration} min
                                    </p>

                                    <Link
                                        to={`/movies/${movie._id}`}
                                    >
                                        <button className="details-button">
                                            View Details
                                        </button>
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </section>

        </div>
    );
}

export default Home;