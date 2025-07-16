


import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Header() {
  const nav = useNavigate();
  const sidebar = useRef();
  const showSidebar = () => {
    sidebar.current.classList.add("show-sidebar");
  };
  const hideSidebar = () => {
    sidebar.current.classList.remove("show-sidebar");
  };
  var isLogin = sessionStorage.getItem("isLogin");

  const logout = () => {
    sessionStorage.clear();
    nav("/login");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  };

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
                <a href="#">
                  <h1 className="text-light">
                    Dial <span className="text-danger">A</span> Meal
                  </h1>
                </a>
              </div>

              {/* Toggle button for mobile */}
              <div className="d-block d-md-none">
                <button
                  className="btn btn-outline-light"
                  onClick={showSidebar}
                  style={{ border: "none", background: "transparent", fontSize: "1.8rem" }}
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
      </header>

      {/* Sidebar for mobile */}
      <aside className="sidebar trans-0-4" ref={sidebar}>
        <button
          className="btn-hide-sidebar ti-close color0-hov trans-0-4"
          onClick={hideSidebar}
        ></button>

        <ul className="menu-sidebar p-t-95 p-b-70">
          <li className="t-center m-b-13"><Link to="/">Home</Link></li>
          <li className="t-center m-b-13"><Link to="/view-meals">Menu</Link></li>
          <li className="t-center m-b-13"><Link to="/gallery">Gallery</Link></li>
          <li className="t-center m-b-13"><Link to="/about">About</Link></li>
          <li className="t-center m-b-13"><Link to="/blog">Blog</Link></li>
          <li className="t-center m-b-33"><Link to="/contact">Contact</Link></li>
          <li className="t-center">
            <Link to="/reservation" className="btn3 flex-c-m size13 txt11 trans-0-4 m-l-r-auto">
              Reservation
            </Link>
          </li>
        </ul>

        <div className="gallery-sidebar t-center p-l-60 p-r-60 p-b-40">
          <h4 className="txt20 m-b-33">Gallery</h4>
          <div className="wrap-gallery-sidebar flex-w">
            {[1, 2, 3, 5, 6, 7, 9, 10, 11].map(num => (
              <a
                key={num}
                className="item-gallery-sidebar wrap-pic-w"
                href={`assets/images/photo-gallery-0${num}.jpg`}
                data-lightbox="gallery-footer"
              >
                <img
                  src={`assets/images/photo-gallery-thumb-0${num}.jpg`}
                  alt="GALLERY"
                />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
