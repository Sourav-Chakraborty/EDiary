import React from "react";

import { Link,useLocation } from "react-router-dom";
export default function Nav() {
  const location=useLocation()//getting the location path


 


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <Link className="navbar-brand" to="/">EDiary</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className={`nav-item ${location.pathname==="/"? "active":""}`}>
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className={`nav-item ${location.pathname==="/about"? "active":""}`}>
        <Link className="nav-link" to="/about">About</Link>
      </li>
     
     
    </ul>
  </div>
</nav>
    </div>
  );
}