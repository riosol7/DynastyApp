import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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