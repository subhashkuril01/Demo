import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Header() {
  const nav = useNavigate();
  const sidebar = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  var isLogin = sessionStorage.getItem("isLogin");

  const logout = () => {
    sessionStorage.clear();
    nav("/login");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <ToastContainer />
      {/* Header */}
      <header>
        <div className="wrap-menu-header gradient1 trans-0-4">
          <div className="container-fluid mt-4 px-5">
            <div className="wrap_header trans-0-3 d-flex justify-content-between align-items-center">
              {/* Logo */}
              <div className="logo">
                <Link to={"/"}>
                  <h1 className="text-light">
                    Dial <span className="text-danger">A</span> Meal
                  </h1>
                </Link>
              </div>

              {/* Toggle button for mobile */}
              <div className="d-block d-md-none">
                <button
                  className="btn btn-outline-light d-lg-none"
                  onClick={toggleMenu}
                >
                  ☰
                </button>
              </div>

              {/* Menu */}
              <div className="wrap_menu p-l-45 p-l-0-xl d-none d-md-block">
                <nav className="menu">
                  <ul className="main_menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/view-meals">Meals</Link></li>
                    <li><Link to="/view-pricing-details">Pricing Details</Link></li>
                    <li><Link to="/custom-bookings">Custom Bookings</Link></li>
                    <li>
                      {isLogin ? (
                        <div className="dropdown menu">
                          <Link className="dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false">
                            User Section
                          </Link>
                          <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><Link className="dropdown-item" to="/viewbookings">View Bookings</Link></li>
                            <li><Link className="dropdown-item" to="/viewcustombookings">View Custom Bookings</Link></li>
                          </ul>
                        </div>
                      ) : (
                        <Link to="/register">Register</Link>
                      )}
                    </li>
                    <li>
                      {isLogin ? (
                        <a href="#" onClick={logout}>LOGOUT</a>
                      ) : (
                        <Link to="/login">LOGIN</Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>


        {menuOpen && (
          <div className="d-lg-none bg-dark px-3 pb-3">
            <ul className="nav flex-column">
              <li className="nav-item"><Link to="/">Home</Link></li>
              <li className="nav-item"><Link to="/about">About</Link></li>
              <li className="nav-item"><Link to="/view-meals">Meals</Link></li>
              <li className="nav-item"><Link to="/view-pricing-details">Pricing Details</Link></li>
              <li className="nav-item"><Link to="/custom-bookings">Custom Bookings</Link></li>
              <li className="nav-item">
                {isLogin ? (
                  <div className="dropdown menu">
                    <Link className="dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false">
                      User Section
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><Link className="dropdown-item" to="/viewbookings">View Bookings</Link></li>
                      <li><Link className="dropdown-item" to="/viewcustombookings">View Custom Bookings</Link></li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/register">Register</Link>
                )}
              </li>
              <li className="nav-item">
                {isLogin ? (
                  <a href="#" onClick={logout}>LOGOUT</a>
                ) : (
                  <Link to="/login">LOGIN</Link>
                )}
              </li>
            </ul>
          </div>
        )}

      </header>
    </>
  );
}