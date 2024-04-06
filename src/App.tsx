import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Dashboard from "./views/dashboard";
import Home from "./views/home";

function App() {
  return (
    <>
      <Routes>
        <Navbar />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Footer />
      </Routes>
    </>
  );
}

export default App;
