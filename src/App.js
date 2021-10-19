import React, { useState } from 'react'

import "./App.css";
import Navbar from "./component/Nav";
import Home from "./component/Home";
import About from "./component/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/notesState";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Alert from "./component/Alert";

function App() {
  const [alert, setalert] = useState({type:"",msg:""})
  return (
    <div>
      <NoteState>
        {/* load NoteState so that i can use useContext inside this  */}
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route path="/about">
                <About />
              </Route>

              
              <Route path="/signin">
                <Signin setalert={setalert} />
              </Route>
              <Route path="/signup">
                <Signup  setalert={setalert}/>
              </Route>
              <Route path="/">
                <Home setalert={setalert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
