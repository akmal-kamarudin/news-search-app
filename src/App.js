import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <div className="backgroundImage"></div>
      <SnackbarProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </>
  );
}

export default App;
