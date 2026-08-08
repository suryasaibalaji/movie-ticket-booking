import { useEffect, useState } from "react";
import "./Movies.css";

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.movies || []);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    return (
        <div className="movies-page">
            <h1>Movies</h1>

            <div className="movie-grid">
                {movies.map((movie) => (
                    <div className="movie-card" key={movie._id}>
                        <img
                            src={movie.poster}
                            alt={movie.title}
                        />

                        <h2>{movie.title}</h2>

                        <p>{movie.genre}</p>

                        <p>{movie.language}</p>

                       <a href={`/movies/${movie._id}`}>
                        <button>View Details</button>
                       </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movies;