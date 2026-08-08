import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                CineBook 🎬
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/movies">
                    Movies
                </Link>

                {token && (
                    <Link to="/my-bookings">
                        My Bookings
                    </Link>
                )}

                {!token ? (
                    <Link to="/login">
                        Login
                    </Link>
                ) : (
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
}

export default Navbar;