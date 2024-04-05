import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../Firebase/Firebase";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import "../css/Navbar.css";
import logo from "../img/eco-5465432_640-removebg-preview.png";

const Navbar = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function handleLogout(e) {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/signUp");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // console.log(auth .token.currentUser.email )

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const hadnleActive = (event) => {
    // event.preventDefault();
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove("active");
    });
    event.target.classList.add("active");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt=""
              width="50px"
              style={{ backgroundColor: "transparent" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="nav-link active active-home"
                    aria-current="page"
                    to="/"
                    onClick={hadnleActive}
                  >
                    Home
                  </Link>
                </li>
              ) : (
                isDisabled
              )}
              {user ? (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="nav-link active-animal"
                    aria-current="page"
                    to="/Animal"
                    onClick={hadnleActive}
                  >
                    Animal
                  </Link>
                </li>
              ) : (
                isDisabled
              )}
              {user ? (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="nav-link active-flower"
                    aria-current="page"
                    to="/Flower"
                    onClick={hadnleActive}
                  >
                    Flower
                  </Link>
                </li>
              ) : (
                isDisabled
              )}
              {user ? (
                <li className="nav-item">
                  {" "}
                  <Link
                    className="nav-link  active-nature"
                    aria-current="page"
                    to="/Nature"
                    onClick={hadnleActive}
                  >
                    Nature
                  </Link>
                </li>
              ) : (
                isDisabled
              )}
              <li className="nav-item text-center">
                {" "}
                <a className="nav-link  text-primary" aria-current="page" to="">
                  {user ? user.displayName : null}
                </a>
              </li>
            </ul>
            <form className="d-flex">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
              {user ? (
                <button
                  className="btn btn-danger"
                  title="Log out"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
