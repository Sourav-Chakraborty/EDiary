import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Signup(props) {
  let history = useHistory();
  const setalert=props.setalert
  const [user, setuser] = useState({ name: "", email: "", password: "",conPassword:"" });
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const hadleSubmit = async (e) => {

    e.preventDefault();
    console.log(user);
    if(user.conPassword!==user.password)
        return alert("Make sure password & confirm password are same")
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === "true") {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      setalert({type:"success",msg:"Congrats sign up sucessful"})
      setTimeout(() => {
      setalert({type:null,msg:""})
        
      }, 4000);
    } else{  
      setalert({type:"danger",msg:"sign up failed"})
      setTimeout(() => {
      setalert({type:null,msg:""})
        
      }, 4000);
    }
  };

  return (
    <div className="container">
      <h1>Create Your account</h1>

      <form onSubmit={hadleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              name="name"
              id="name"
              placeholder="name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleChange}
              type="email"
              className="form-control length"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleChange}
              type="password"
              className="form-control length"
              id="password"
              name="password"
              placeholder="Passwords must have atleast 5 charecter"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
           Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleChange}
              type="password"
              className="form-control length"
              id="conPassword"
              name="conPassword"
              placeholder="confirm Password"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 text-center">
            <button type="submit" className="btn btn-primary ">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
