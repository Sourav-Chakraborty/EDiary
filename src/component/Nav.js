import React from "react";

import { Link, useLocation,useHistory } from "react-router-dom";
export default function Nav() {
  const history=useHistory()
  const location = useLocation(); //getting the location path
  const handlelogout=()=>{
    console.log("Logging out")
    localStorage.removeItem("token")
    history.push("/signin")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
          EDiary
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
         {!localStorage.getItem('token')?  <form className="form-inline my-2 my-lg-0">
            <Link
              className="btn btn-outline-warning mx-2"
              to="/signup"
              role="button"
            >
              Sign up
            </Link>
            <Link className="btn btn-outline-warning mx-2" to="/signin" role="button">
              Sign in
            </Link>
          </form>: 
          <button onClick={handlelogout} type="button" className="btn btn-outline-warning mx-2">Sign out</button>

          }
        </div>
      </nav>
    </div>
  );
}
