import "./App.css";
import Navbar from "./component/Nav";
import Home from "./component/Home";
import About from "./component/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/notesState";
import Signin from "./component/Signin";
import Signup from "./component/Signup";

function App() {
  return (
    <div>
      <NoteState>
        {/* load NoteState so that i can use useContext inside this  */}
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/about">
                <About />
              </Route>

              
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
