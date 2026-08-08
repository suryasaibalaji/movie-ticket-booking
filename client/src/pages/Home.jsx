import "./Home.css";

function Home() {
    return (
        <div className="home">
            <nav className="navbar">
                <h2>🎬 CineBook</h2>

                <div>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </nav>

            <section className="hero">
                <h1>Book Your Movie Tickets</h1>
                <p>Find your favourite movies and book your seats easily.</p>

                <button className="browse-btn">
                    Browse Movies
                </button>
            </section>

            <section className="movies">
                <h2>Popular Movies</h2>

                <div className="movie-card">
                    <h3>Interstellar</h3>
                    <p>Science Fiction • English</p>
                    <button>View Details</button>
                </div>
            </section>
        </div>
    );
}

export default Home;