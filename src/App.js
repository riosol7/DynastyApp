import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path={`/Home`} element={<Home />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
