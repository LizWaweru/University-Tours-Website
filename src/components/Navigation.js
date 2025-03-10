import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navigation() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Universities In Kenya</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link 
                                to="/" 
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                                aria-current={location.pathname === '/' ? 'page' : undefined}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/about" 
                                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                                aria-current={location.pathname === '/about' ? 'page' : undefined}
                            >
                                Listings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/admin" 
                                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                                aria-current={location.pathname === '/admin' ? 'page' : undefined}
                            >
                                Admin
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search universities" 
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;