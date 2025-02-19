import { Link } from "react-router-dom";
function Navigation(){
    return (
        <nav className="nav nav-tabs justify-content-center mt-4 mb-4">
            <li className="nav-item">
                <Link to="/" className="text-white nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin" className="text-white nav-link">Admin</Link>
            </li>
        </nav>
    );
}

export default Navigation;